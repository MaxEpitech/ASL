import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

// Schema de validation
const memberSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    role: z.enum(['president', 'vice_president', 'treasurer', 'secretary', 'member']).nullable().optional(),
    position: z.string().nullable().optional(),
    photo: z.string().nullable().optional().or(z.literal("")),
    bio: z.string().nullable().optional(),
    email: z.string().email("Email invalide").nullable().optional().or(z.literal("")),
    phone: z.string().nullable().optional(),
    order: z.number().int().min(0),
    isBoardMember: z.boolean().default(false),
    active: z.boolean().default(true),
});

// GET - Liste tous les membres (admin)
export async function GET() {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const members = await prisma.member.findMany({
            orderBy: {
                order: 'asc',
            },
        });

        return NextResponse.json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des membres' },
            { status: 500 }
        );
    }
}

// POST - Créer un nouveau membre
export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = memberSchema.parse(body);

        const member = await prisma.member.create({
            data: {
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                role: validatedData.role || null,
                position: validatedData.position || null,
                photo: validatedData.photo || null,
                bio: validatedData.bio || null,
                email: validatedData.email || null,
                phone: validatedData.phone || null,
                order: validatedData.order,
                isBoardMember: validatedData.isBoardMember,
                active: validatedData.active,
            },
        });

        return NextResponse.json(member);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error creating member:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du membre' },
            { status: 500 }
        );
    }
}
