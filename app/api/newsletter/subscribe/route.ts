import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const SubscribeSchema = z.object({
    email: z.string().email('Email invalide'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = SubscribeSchema.parse(body);

        // Check if already subscribed
        const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email: validatedData.email },
        });

        if (existing) {
            if (existing.unsubscribed) {
                // Resubscribe
                await prisma.newsletterSubscriber.update({
                    where: { email: validatedData.email },
                    data: {
                        unsubscribed: false,
                        unsubscribedAt: null,
                        confirmed: true,
                        confirmedAt: new Date(),
                        firstName: validatedData.firstName || existing.firstName,
                        lastName: validatedData.lastName || existing.lastName,
                    },
                });

                return NextResponse.json(
                    { success: true, message: 'Réinscription réussie' },
                    { status: 200 }
                );
            }

            return NextResponse.json(
                { success: false, message: 'Vous êtes déjà inscrit à la newsletter' },
                { status: 400 }
            );
        }

        // Create new subscriber
        await prisma.newsletterSubscriber.create({
            data: {
                email: validatedData.email,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                confirmed: true,
                confirmedAt: new Date(),
            },
        });

        // TODO: Send welcome email
        // await sendNewsletterEmail({
        //   to: validatedData.email,
        //   subject: 'Bienvenue à la newsletter ASL',
        //   content: '<h2>Merci de votre inscription!</h2>...',
        // });

        return NextResponse.json(
            { success: true, message: 'Inscription réussie' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.errors },
                { status: 400 }
            );
        }

        console.error('Error subscribing to newsletter:', error);
        return NextResponse.json(
            { error: 'Erreur lors de l\'inscription' },
            { status: 500 }
        );
    }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Email requis' },
                { status: 400 }
            );
        }

        await prisma.newsletterSubscriber.update({
            where: { email },
            data: {
                unsubscribed: true,
                unsubscribedAt: new Date(),
            },
        });

        return NextResponse.json(
            { success: true, message: 'Désinscription réussie' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la désinscription' },
            { status: 500 }
        );
    }
}
