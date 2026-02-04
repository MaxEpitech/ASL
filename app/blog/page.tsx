import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { ArticleList } from '@/components/blog/ArticleList';

export const metadata: Metadata = {
  title: 'Blog - ASL Jeux Écossais',
  description: 'Actualités, événements et articles sur les jeux écossais par l\'ASL.',
};

async function getBlogPosts(page: number = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog?page=${page}&limit=9`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  return res.json();
}

export default async function BlogPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams.page || '1');
  const data = await getBlogPosts(currentPage);

  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-br from-blue-600 to-green-700 text-white py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog ASL Jeux Écossais
            </h1>
            <p className="text-xl opacity-90">
              Découvrez nos actualités, événements et articles sur la culture des jeux écossais
            </p>
          </div>
        </Container>
      </Section>

      {/* Articles */}
      <Section>
        <Container>
          <ArticleList
            articles={data.posts}
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
          />
        </Container>
      </Section>
    </>
  );
}
