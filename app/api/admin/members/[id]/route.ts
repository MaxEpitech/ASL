import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

const memberUpdateSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    role: z.enum(['president', 'vice_president', 'treasurer', 'secretary', 'member']).optional().or(z.null()),
    position: z.string().optional().or(z.null()),
    photo: z.string().nullable().optional().or(z.literal("")),
    bio: z.string().optional().or(z.null()),
    email: z.string().email().optional().or(z.literal("")).or(z.null()),
    phone: z.string().optional().or(z.null()),
    order: z.number().int().min(0).optional(),
    isBoardMember: z.boolean().optional(),
    active: z.boolean().optional(),
});

// PUT - Modifier un membre
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const validatedData = memberUpdateSchema.parse(body);

        // Vérifier que le membre existe
        const existingMember = await prisma.member.findUnique({
            where: { id },
        });

        if (!existingMember) {
            return NextResponse.json(
                { error: 'Membre non trouvé' },
                { status: 404 }
            );
        }

        const member = await prisma.member.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(member);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error updating member:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour du membre' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un membre
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const { id } = await params;

        // Vérifier que le membre existe
        const member = await prisma.member.findUnique({
            where: { id },
        });

        if (!member) {
            return NextResponse.json(
                { error: 'Membre non trouvé' },
                { status: 404 }
            );
        }

        await prisma.member.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting member:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la suppression du membre' },
            { status: 500 }
        );
    }
}
