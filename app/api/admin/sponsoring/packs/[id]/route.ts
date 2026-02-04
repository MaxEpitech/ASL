import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

const packUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    slug: z.string().optional(),
    description: z.string().min(10).optional(),
    price: z.number().min(0).optional(),
    benefits: z.array(z.string()).min(1).optional(),
    order: z.number().int().min(0).optional(),
    active: z.boolean().optional(),
    featured: z.boolean().optional(),
});

// PUT - Modifier un pack
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = packUpdateSchema.parse(body);

        // Vérifier que le pack existe
        const existingPack = await prisma.sponsoringPack.findUnique({
            where: { id: params.id },
        });

        if (!existingPack) {
            return NextResponse.json(
                { error: 'Pack non trouvé' },
                { status: 404 }
            );
        }

        // Si le slug est modifié, vérifier l'unicité
        if (validatedData.slug && validatedData.slug !== existingPack.slug) {
            const slugExists = await prisma.sponsoringPack.findUnique({
                where: { slug: validatedData.slug },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: 'Un pack avec ce slug existe déjà' },
                    { status: 400 }
                );
            }
        }

        // Préparer les données à mettre à jour
        const updateData: any = { ...validatedData };
        if (validatedData.benefits) {
            updateData.benefits = JSON.stringify(validatedData.benefits);
        }

        const pack = await prisma.sponsoringPack.update({
            where: { id: params.id },
            data: updateData,
        });

        return NextResponse.json({
            ...pack,
            benefits: JSON.parse(pack.benefits as string),
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.errors },
                { status: 400 }
            );
        }

        console.error('Error updating pack:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour du pack' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un pack
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        // Vérifier que le pack existe
        const pack = await prisma.sponsoringPack.findUnique({
            where: { id: params.id },
            include: {
                _count: {
                    select: { sponsors: true },
                },
            },
        });

        if (!pack) {
            return NextResponse.json(
                { error: 'Pack non trouvé' },
                { status: 404 }
            );
        }

        // Vérifier qu'aucun sponsor n'utilise ce pack
        if (pack._count.sponsors > 0) {
            return NextResponse.json(
                {
                    error: `Impossible de supprimer ce pack car ${pack._count.sponsors} sponsor(s) y sont associés`,
                },
                { status: 400 }
            );
        }

        await prisma.sponsoringPack.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting pack:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la suppression du pack' },
            { status: 500 }
        );
    }
}
