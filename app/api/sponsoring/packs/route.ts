import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Liste des packs actifs pour la page publique
export async function GET() {
    try {
        const packs = await prisma.sponsoringPack.findMany({
            where: {
                active: true,
            },
            orderBy: {
                order: 'asc',
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                benefits: true,
                featured: true,
                order: true,
            },
        });

        // Parse benefits JSON et calculer le coût réel
        const packsWithBenefits = packs.map((pack) => ({
            ...pack,
            benefits: typeof pack.benefits === 'string' ? JSON.parse(pack.benefits) : pack.benefits,
            realCost: Math.round(pack.price - pack.price * 0.66), // 66% de réduction fiscale
        }));

        return NextResponse.json(packsWithBenefits);
    } catch (error) {
        console.error('Error fetching public packs:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des packs' },
            { status: 500 }
        );
    }
}
