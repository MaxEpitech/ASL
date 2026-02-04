'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TiptapEditor } from '@/components/admin/TiptapEditor';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch categories
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = new Map();
        data.posts?.forEach((post: any) => {
          if (post.category) {
            uniqueCategories.set(post.category.id, post.category);
          }
        });
        setCategories(Array.from(uniqueCategories.values()));
      });

    // 2. Fetch Post Data
    if (id) {
        fetch(`/api/admin/blog/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Post not found');
                return res.json();
            })
            .then(data => {
                const post = data.post;
                setTitle(post.title);
                setSlug(post.slug);
                setExcerpt(post.excerpt || '');
                setContent(post.content || '');
                setCoverImage(post.coverImage || '');
                setCategoryId(post.categoryId || '');
                setMetaTitle(post.metaTitle || '');
                setMetaDescription(post.metaDescription || '');
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Erreur lors du chargement de l\'article');
                router.push('/admin/blog');
            });
    }
  }, [id, router]);

  const handleSave = async (publishNow = false) => {
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          coverImage,
          categoryId: categoryId || null,
          published: publishNow,
          metaTitle,
          metaDescription,
        }),
      });

      if (res.ok) {
        // Optionnel : ne pas rediriger si on veut continuer d'éditer
        router.push('/admin/blog');
      } else {
        const error = await res.json();
        alert(error.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
      return <div className="p-12 text-center text-gray-500">Chargement de l'article...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/blog"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la liste
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving || !title || !slug || !content}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Enregistrer
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving || !title || !slug || !content}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye className="w-4 h-4" />
            Publier & Enregistrer
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
            placeholder="Titre de l'article"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="mon-article-slug"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            URL finale : /blog/{slug || 'mon-article-slug'}
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Extrait
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Court résumé de l'article"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image de couverture (URL)
          </label>
          <input
            type="text" // Changé en text pour accepter les chemins relatifs
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="/uploads/image.jpg ou https://..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contenu *
          </label>
          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Écrivez votre article ici..."
          />
        </div>

        {/* SEO Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Titre
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={title || "Titre pour les moteurs de recherche"}
                maxLength={60}
              />
              <p className="text-sm text-gray-500 mt-1">
                {metaTitle.length}/60 caractères (laissez vide pour utiliser le titre)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder={excerpt || "Description pour les moteurs de recherche"}
                maxLength={160}
              />
              <p className="text-sm text-gray-500 mt-1">
                {metaDescription.length}/160 caractères (laissez vide pour utiliser l'extrait)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
