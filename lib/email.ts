import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    from?: string;
    replyTo?: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail(options: SendEmailOptions) {
    const from = options.from || process.env.EMAIL_FROM || 'ASL Jeux Écossais <noreply@asl-jeuxecossais.fr>';

    try {
        const { data, error } = await resend.emails.send({
            from,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
            replyTo: options.replyTo,
        });

        if (error) {
            console.error('Error sending email:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }

        return { success: true, data };
    } catch (error) {
        console.error('Exception sending email:', error);
        throw error;
    }
}

/**
 * Send contact confirmation email
 */
export async function sendContactConfirmation(params: {
    to: string;
    name: string;
}) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #005EB8; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #2D5016; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ASL Jeux Écossais</h1>
          </div>
          <div class="content">
            <h2>Merci pour votre message !</h2>
            <p>Bonjour ${params.name},</p>
            <p>Nous avons bien reçu votre message et nous vous remercions de l'intérêt que vous portez à l'ASL Jeux Écossais.</p>
            <p>Notre équipe reviendra vers vous dans les plus brefs délais.</p>
            <p>À très bientôt,<br><strong>L'équipe ASL Jeux Écossais</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 ASL Jeux Écossais - Association Sportive Luzarchoise</p>
            <p><a href="mailto:contact@asl-jeuxecossais.fr">contact@asl-jeuxecossais.fr</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

    const text = `Merci pour votre message !\n\nBonjour ${params.name},\n\nNous avons bien reçu votre message et nous vous remercions de l'intérêt que vous portez à l'ASL Jeux Écossais.\n\nNotre équipe reviendra vers vous dans les plus brefs délais.\n\nÀ très bientôt,\nL'équipe ASL Jeux Écossais`;

    return sendEmail({
        to: params.to,
        subject: 'Confirmation de votre demande - ASL Jeux Écossais',
        html,
        text,
    });
}

/**
 * Send sponsoring inquiry notification to admin
 */
export async function sendSponsoringNotification(params: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
    tier?: string;
    message: string;
}) {
    const adminEmail = process.env.EMAIL_SPONSORING || 'sponsoring@asl-jeuxecossais.fr';

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #005EB8; color: white; padding: 30px; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .field { margin-bottom: 15px; }
          .field strong { display: inline-block; width: 120px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouvelle demande de partenariat</h1>
          </div>
          <div class="content">
            <div class="field"><strong>Nom:</strong> ${params.name}</div>
            ${params.company ? `<div class="field"><strong>Entreprise:</strong> ${params.company}</div>` : ''}
            <div class="field"><strong>Email:</strong> <a href="mailto:${params.email}">${params.email}</a></div>
            ${params.phone ? `<div class="field"><strong>Téléphone:</strong> ${params.phone}</div>` : ''}
            ${params.tier ? `<div class="field"><strong>Pack souhaité:</strong> ${params.tier}</div>` : ''}
            <div class="field">
              <strong>Message:</strong><br>
              <div style="margin-top: 10px; padding: 15px; background: white; border-left: 3px solid #005EB8;">
                ${params.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: adminEmail,
        subject: `Nouvelle demande de partenariat${params.tier ? ` - ${params.tier}` : ''}`,
        html,
        replyTo: params.email,
    });
}

/**
 * Send newsletter email
 */
export async function sendNewsletterEmail(params: {
    to: string | string[];
    subject: string;
    content: string;
}) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #005EB8; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ASL Jeux Écossais</h1>
          </div>
          <div class="content">
            ${params.content}
          </div>
          <div class="footer">
            <p>© 2025 ASL Jeux Écossais - Association Sportive Luzarchoise</p>
            <p><a href="mailto:contact@asl-jeuxecossais.fr">contact@asl-jeuxecossais.fr</a></p>
            <p><small><a href="{{UNSUBSCRIBE_URL}}">Se désabonner</a></small></p>
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: params.to,
        subject: params.subject,
        html,
    });
}
