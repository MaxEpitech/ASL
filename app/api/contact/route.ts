import { NextRequest, NextResponse } from 'next/server';
import { sendContactConfirmation, sendSponsoringNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, company, email, phone, tier, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Send notification to admin
        await sendSponsoringNotification({
            name,
            company,
            email,
            phone,
            tier,
            message,
        });

        // Send confirmation to user
        await sendContactConfirmation({
            to: email,
            name,
        });

        return NextResponse.json(
            { success: true, message: 'Message envoyé avec succès' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi du message' },
            { status: 500 }
        );
    }
}
