import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

// Schema de validation pour un pack
const packSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    slug: z.string().optional(),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
    price: z.number().min(0, "Le prix doit être positif"),
    benefits: z.array(z.string()).min(1, "Au moins un avantage est requis"),
    order: z.number().int().min(0, "L'ordre doit être positif"),
    active: z.boolean().default(true),
    featured: z.boolean().default(false),
});

// GET - Liste tous les packs
export async function GET() {
    try {
        const packs = await prisma.sponsoringPack.findMany({
            orderBy: {
                order: 'asc',
            },
            include: {
                _count: {
                    select: { sponsors: true },
                },
            },
        });

        // Parse benefits JSON
        const packsWithBenefits = packs.map((pack) => ({
            ...pack,
            benefits: typeof pack.benefits === 'string' ? JSON.parse(pack.benefits) : pack.benefits,
            sponsorCount: pack._count.sponsors,
        }));

        return NextResponse.json(packsWithBenefits);
    } catch (error) {
        console.error('Error fetching packs:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des packs' },
            { status: 500 }
        );
    }
}

// POST - Créer un nouveau pack
export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = packSchema.parse(body);

        // Générer le slug si non fourni
        const slug = validatedData.slug ||
            validatedData.name.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

        // Vérifier l'unicité du slug
        const existingPack = await prisma.sponsoringPack.findUnique({
            where: { slug },
        });

        if (existingPack) {
            return NextResponse.json(
                { error: 'Un pack avec ce slug existe déjà' },
                { status: 400 }
            );
        }

        const pack = await prisma.sponsoringPack.create({
            data: {
                name: validatedData.name,
                slug,
                description: validatedData.description,
                price: validatedData.price,
                benefits: JSON.stringify(validatedData.benefits),
                order: validatedData.order,
                active: validatedData.active,
                featured: validatedData.featured,
            },
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

        console.error('Error creating pack:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du pack' },
            { status: 500 }
        );
    }
}
