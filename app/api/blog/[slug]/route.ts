import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const post = await prisma.blogPost.findUnique({
            where: {
                slug,
                published: true,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!post) {
            return NextResponse.json(
                { error: 'Article non trouvé' },
                { status: 404 }
            );
        }

        // Get related posts (same category)
        const relatedPosts = await prisma.blogPost.findMany({
            where: {
                published: true,
                categoryId: post.categoryId,
                NOT: {
                    id: post.id,
                },
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                category: true,
            },
            take: 3,
            orderBy: {
                publishedAt: 'desc',
            },
        });

        return NextResponse.json({
            post,
            relatedPosts,
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog post' },
            { status: 500 }
        );
    }
}
