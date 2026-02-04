import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
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

export function ArticleCard({
  slug,
  title,
  excerpt,
  coverImage,
  publishedAt,
  category,
  author,
}: ArticleCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Cover Image */}
      {coverImage ? (
        <Link href={`/blog/${slug}`} className="block relative h-48 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      ) : (
        <Link href={`/blog/${slug}`} className="block relative h-48 bg-gradient-to-br from-blue-600 to-green-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">ASL</div>
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        {category && (
          <Link
            href={`/blog/category/${category.slug}`}
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 transition-colors"
            style={{
              backgroundColor: category.color || '#005EB8',
              color: 'white',
            }}
          >
            {category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            {author.name && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {author.name}
              </span>
            )}
          </div>
          <Link
            href={`/blog/${slug}`}
            className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Lire
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
