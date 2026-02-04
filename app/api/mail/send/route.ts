import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

// Validation schema
const SendEmailSchema = z.object({
    to: z.union([z.string().email(), z.array(z.string().email())]),
    subject: z.string().min(1),
    html: z.string().min(1),
    text: z.string().optional(),
    replyTo: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
    try {
        // TODO: Add authentication check here
        // Only admin users should be able to send arbitrary emails
        // const session = await getServerSession();
        // if (!session || session.user.role !== 'ADMIN') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await request.json();

        // Validate input
        const validatedData = SendEmailSchema.parse(body);

        // Send email
        const result = await sendEmail(validatedData);

        return NextResponse.json(
            { success: true, data: result.data },
            { status: 200 }
        );
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid input', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
