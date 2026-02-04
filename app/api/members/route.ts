import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET - Liste des membres actifs pour la page publique
export async function GET() {
    try {
        const members = await prisma.member.findMany({
            where: {
                active: true,
            },
            orderBy: {
                order: 'asc',
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                position: true,
                photo: true,
                bio: true,
                isBoardMember: true,
                order: true,
            },
        });

        // Séparer membres du bureau et membres actifs
        const boardMembers = members.filter((m) => m.isBoardMember);
        const activeMembers = members.filter((m) => !m.isBoardMember);

        return NextResponse.json({
            boardMembers,
            activeMembers,
        });
    } catch (error) {
        console.error('Error fetching public members:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des membres' },
            { status: 500 }
        );
    }
}
