import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CreateBlogPostSchema = z.object({
    title: z.string().min(1, 'Titre requis'),
    slug: z.string().min(1, 'Slug requis'),
    excerpt: z.string().optional(),
    content: z.string().min(1, 'Contenu requis'),
    coverImage: z.string().url().optional().or(z.literal('')),
    categoryId: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const posts = await prisma.blogPost.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = CreateBlogPostSchema.parse(body);

        // Create the blog post
        const post = await prisma.blogPost.create({
            data: {
                title: validatedData.title,
                slug: validatedData.slug,
                excerpt: validatedData.excerpt,
                content: validatedData.content,
                coverImage: validatedData.coverImage || null,
                published: validatedData.published,
                publishedAt: validatedData.published ? new Date() : null,
                metaTitle: validatedData.metaTitle,
                metaDescription: validatedData.metaDescription,
                authorId: session.user.id,
                categoryId: validatedData.categoryId || null,
            },
        });

        // Add tags if provided
        if (validatedData.tags && validatedData.tags.length > 0) {
            await Promise.all(
                validatedData.tags.map((tagId) =>
                    prisma.blogPostTag.create({
                        data: {
                            postId: post.id,
                            tagId,
                        },
                    })
                )
            );
        }

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid input', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
