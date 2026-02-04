import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { ArticleCard } from '@/components/blog/ArticleCard';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogPost(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogPost(slug);

  if (!data?.post) {
    return {
      title: 'Article non trouvé',
    };
  }

  const { post } = data;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogPost(slug);

  if (!data?.post) {
    notFound();
  }

  const { post, relatedPosts } = data;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Hero with Cover Image */}
      <Section className="bg-gray-100 py-12">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Title & Meta */}
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 transition-colors"
                style={{
                  backgroundColor: post.category.color || '#005EB8',
                  color: 'white',
                }}
              >
                {post.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formattedDate}
              </span>
              {post.author?.name && (
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {post.author.name}
                </span>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-700 mb-8 italic">
                {post.excerpt}
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-8 border-t">
                <span className="text-gray-600 font-semibold">Tags:</span>
                {post.tags.map(({ tag }: any) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <Section className="bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((article: any) => (
                <ArticleCard
                  key={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  coverImage={article.coverImage}
                  publishedAt={article.publishedAt}
                  category={article.category}
                  author={article.author}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
