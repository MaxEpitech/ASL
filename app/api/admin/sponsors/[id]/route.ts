import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

const sponsorUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    logo: z.string().min(1).optional(),
    website: z.string().url().optional().or(z.literal("")).or(z.null()),
    packId: z.string().optional(),
    order: z.number().int().min(0).optional(),
    active: z.boolean().optional(),
});

// PUT - Modifier un sponsor
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
        const validatedData = sponsorUpdateSchema.parse(body);

        // Vérifier que le sponsor existe
        const existingSponsor = await prisma.sponsor.findUnique({
            where: { id: params.id },
        });

        if (!existingSponsor) {
            return NextResponse.json(
                { error: 'Sponsor non trouvé' },
                { status: 404 }
            );
        }

        // Si packId est fourni, vérifier qu'il existe
        if (validatedData.packId) {
            const pack = await prisma.sponsoringPack.findUnique({
                where: { id: validatedData.packId },
            });

            if (!pack) {
                return NextResponse.json(
                    { error: 'Pack de sponsoring non trouvé' },
                    { status: 404 }
                );
            }
        }

        const sponsor = await prisma.sponsor.update({
            where: { id: params.id },
            data: validatedData,
            include: {
                pack: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        return NextResponse.json(sponsor);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.errors },
                { status: 400 }
            );
        }

        console.error('Error updating sponsor:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour du sponsor' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un sponsor
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        // Vérifier que le sponsor existe
        const sponsor = await prisma.sponsor.findUnique({
            where: { id: params.id },
        });

        if (!sponsor) {
            return NextResponse.json(
                { error: 'Sponsor non trouvé' },
                { status: 404 }
            );
        }

        await prisma.sponsor.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting sponsor:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la suppression du sponsor' },
            { status: 500 }
        );
    }
}
