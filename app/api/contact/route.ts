import { NextRequest, NextResponse } from 'next/server';

// TODO: Install and configure an email service (Resend, SendGrid, or Nodemailer)
// Example with Resend:
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

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

        // TODO: Implement email sending
        // Example with Resend:
        /*
        await resend.emails.send({
          from: 'ASL Jeux Écossais <noreply@asl-jeuxecossais.fr>',
          to: 'sponsoring@asl-jeuxecossais.fr',
          subject: `Nouvelle demande de partenariat - ${tier || 'Non spécifié'}`,
          html: `
            <h2>Nouvelle demande de partenariat</h2>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Entreprise:</strong> ${company || 'Non spécifié'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone || 'Non spécifié'}</p>
            <p><strong>Palier souhaité:</strong> ${tier || 'Non spécifié'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
        */

        // For now, just log the form data (development only)
        console.log('Contact form submission:', { name, company, email, phone, tier, message });

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
