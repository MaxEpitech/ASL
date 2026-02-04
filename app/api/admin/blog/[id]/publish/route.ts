import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { published } = body;

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                published,
                publishedAt: published ? new Date() : null,
            },
        });

        return NextResponse.json({ post });
    } catch (error) {
        console.error('Error publishing/unpublishing post:', error);
        return NextResponse.json(
            { error: 'Failed to update post status' },
            { status: 500 }
        );
    }
}
