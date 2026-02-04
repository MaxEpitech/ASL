'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  ExternalLink,
  Upload,
} from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string | null;
  pack: {
    id: string;
    name: string;
    slug: string;
  };
  order: number;
  active: boolean;
}

interface SponsoringPack {
  id: string;
  name: string;
  slug: string;
}

interface SponsorFormData {
  name: string;
  logo: string;
  website: string;
  packId: string;
  order: number;
  active: boolean;
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [packs, setPacks] = useState<SponsoringPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState<SponsorFormData>({
    name: '',
    logo: '',
    website: '',
    packId: '',
    order: 0,
    active: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSponsors();
    fetchPacks();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await fetch('/api/admin/sponsors');
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setSponsors(data);
    } catch (err) {
      setError('Erreur lors du chargement des sponsors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPacks = async () => {
    try {
      const res = await fetch('/api/admin/sponsoring/packs');
      if (!res.ok) throw new Error('Erreur lors du chargement des packs');
      const data = await res.json();
      setPacks(data.filter((p: any) => p.active));
    } catch (err) {
      console.error('Erreur lors du chargement des packs:', err);
    }
  };

  const handleOpenModal = (sponsor?: Sponsor) => {
    if (sponsor) {
      setEditingSponsor(sponsor);
      setFormData({
        name: sponsor.name,
        logo: sponsor.logo,
        website: sponsor.website || '',
        packId: sponsor.pack?.id || '',
        order: sponsor.order,
        active: sponsor.active,
      });
    } else {
      setEditingSponsor(null);
      setFormData({
        name: '',
        logo: '',
        website: '',
        packId: packs.length > 0 ? packs[0].id : '',
        order: sponsors.length,
        active: true,
      });
    }
    setError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSponsor(null);
    setError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format non supporté. Utilisez PNG, JPG, SVG ou WEBP');
      return;
    }

    // Vérifier la taille (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setError('Le fichier est trop volumineux (max 2MB)');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de l\'upload');
      }

      const data = await res.json();
      setFormData((prev) => ({ ...prev, logo: data.url }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!formData.logo) {
        setError('Veuillez ajouter un logo');
        setSubmitting(false);
        return;
      }

      if (!formData.packId) {
        setError('Veuillez sélectionner un pack');
        setSubmitting(false);
        return;
      }

      const payload = {
        ...formData,
        website: formData.website || null,
      };

      const url = editingSponsor
        ? `/api/admin/sponsors/${editingSponsor.id}`
        : '/api/admin/sponsors';

      const method = editingSponsor ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }

      await fetchSponsors();
      handleCloseModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (sponsor: Sponsor) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${sponsor.name}" ?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/sponsors/${sponsor.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      await fetchSponsors();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sponsors</h1>
          <p className="text-gray-600 mt-1">
            Gérez les sponsors affichés sur le site
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter un sponsor
        </button>
      </div>

      {/* Tableau des sponsors */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pack
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Site web
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ordre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sponsors.map((sponsor) => (
              <tr key={sponsor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative w-16 h-16">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{sponsor.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${sponsor.pack ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                    {sponsor.pack ? sponsor.pack.name : 'Pack manquant'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sponsor.website ? (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{sponsor.order}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sponsor.active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="w-3 h-3 mr-1" />
                      Actif
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <X className="w-3 h-3 mr-1" />
                      Inactif
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(sponsor)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(sponsor)}
                    className="text-red-600 hover:text-red-900"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sponsors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucun sponsor. Ajoutez-en un pour commencer !
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingSponsor ? 'Modifier le sponsor' : 'Ajouter un sponsor'}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du sponsor *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Upload logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">
                      PNG, JPG, SVG ou WEBP - Max 2MB
                    </p>

                    {/* Preview */}
                    {formData.logo && (
                      <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg p-2">
                        <Image
                          src={formData.logo}
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    {/* URL manuelle */}
                    <input
                      type="text"
                      value={formData.logo}
                      onChange={(e) =>
                        setFormData({ ...formData, logo: e.target.value })
                      }
                      placeholder="Ou collez l'URL du logo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Pack */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pack de sponsoring *
                  </label>
                  <select
                    value={formData.packId}
                    onChange={(e) =>
                      setFormData({ ...formData, packId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez un pack</option>
                    {packs.map((pack) => (
                      <option key={pack.id} value={pack.id}>
                        {pack.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Site web */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site web (optionnel)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    placeholder="https://exemple.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ordre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: Number(e.target.value) })
                    }
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Active */}
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) =>
                        setFormData({ ...formData, active: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Sponsor actif</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting || uploading}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting
                      ? 'Enregistrement...'
                      : uploading
                      ? 'Upload en cours...'
                      : editingSponsor
                      ? 'Enregistrer'
                      : 'Créer'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting || uploading}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
