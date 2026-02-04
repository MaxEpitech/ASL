import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

// Schema de validation
const sponsorSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    logo: z.string().min(1, "L'URL est requise"),
    website: z.string().url("URL invalide").optional().or(z.literal("")),
    packId: z.string().min(1, "Un pack doit être sélectionné"),
    order: z.number().int().min(0, "L'ordre doit être positif"),
    active: z.boolean().default(true),
});

// GET - Liste tous les sponsors (admin)
export async function GET() {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const sponsors = await prisma.sponsor.findMany({
            orderBy: {
                order: 'asc',
            },
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

        return NextResponse.json(sponsors);
    } catch (error) {
        console.error('Error fetching sponsors:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des sponsors' },
            { status: 500 }
        );
    }
}

// POST - Créer un nouveau sponsor
export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = sponsorSchema.parse(body);

        // Vérifier que le pack existe
        const pack = await prisma.sponsoringPack.findUnique({
            where: { id: validatedData.packId },
        });

        if (!pack) {
            return NextResponse.json(
                { error: 'Pack de sponsoring non trouvé' },
                { status: 404 }
            );
        }

        const sponsor = await prisma.sponsor.create({
            data: {
                name: validatedData.name,
                logo: validatedData.logo,
                website: validatedData.website || null,
                packId: validatedData.packId,
                order: validatedData.order,
                active: validatedData.active,
            },
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

        console.error('Error creating sponsor:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du sponsor' },
            { status: 500 }
        );
    }
}
