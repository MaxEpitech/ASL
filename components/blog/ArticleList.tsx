import { ArticleCard } from './ArticleCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt: Date | string;
  category?: {
    name: string;
    slug: string;
    color?: string;
  };
  author: {
    name?: string;
    image?: string;
  };
}

interface ArticleListProps {
  articles: Article[];
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
}

export function ArticleList({
  articles,
  currentPage = 1,
  totalPages = 1,
  basePath = '/blog',
}: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucun article trouvé</p>
      </div>
    );
  }

  return (
    <div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          {currentPage > 1 ? (
            <Link
              href={`${basePath}?page=${currentPage - 1}`}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </button>
          )}

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`${basePath}?page=${page}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            ))}
          </div>

          {/* Next Button */}
          {currentPage < totalPages ? (
            <Link
              href={`${basePath}?page=${currentPage + 1}`}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed"
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
