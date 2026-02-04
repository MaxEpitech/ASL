'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Star,
  Euro,
  Calculator,
} from 'lucide-react';

interface SponsoringPack {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  benefits: string[];
  order: number;
  active: boolean;
  featured: boolean;
  sponsorCount: number;
}

interface PackFormData {
  name: string;
  description: string;
  price: number;
  benefits: string[];
  order: number;
  active: boolean;
  featured: boolean;
}

export default function SponsoringPacksPage() {
  const router = useRouter();
  const [packs, setPacks] = useState<SponsoringPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPack, setEditingPack] = useState<SponsoringPack | null>(null);
  const [formData, setFormData] = useState<PackFormData>({
    name: '',
    description: '',
    price: 0,
    benefits: [''],
    order: 0,
    active: true,
    featured: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const res = await fetch('/api/admin/sponsoring/packs');
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setPacks(data);
    } catch (err) {
      setError('Erreur lors du chargement des packs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (pack?: SponsoringPack) => {
    if (pack) {
      setEditingPack(pack);
      setFormData({
        name: pack.name,
        description: pack.description,
        price: pack.price,
        benefits: pack.benefits,
        order: pack.order,
        active: pack.active,
        featured: pack.featured,
      });
    } else {
      setEditingPack(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        benefits: [''],
        order: packs.length,
        active: true,
        featured: false,
      });
    }
    setError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPack(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Filtrer les avantages vides
      const filteredBenefits = formData.benefits.filter((b) => b.trim() !== '');

      if (filteredBenefits.length === 0) {
        setError('Veuillez ajouter au moins un avantage');
        setSubmitting(false);
        return;
      }

      const payload = {
        ...formData,
        benefits: filteredBenefits,
      };

      const url = editingPack
        ? `/api/admin/sponsoring/packs/${editingPack.id}`
        : '/api/admin/sponsoring/packs';

      const method = editingPack ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }

      await fetchPacks();
      handleCloseModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (pack: SponsoringPack) => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer le pack "${pack.name}" ?${
          pack.sponsorCount > 0
            ? `\n\nATTENTION : ${pack.sponsorCount} sponsor(s) utilisent ce pack.`
            : ''
        }`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/sponsoring/packs/${pack.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      await fetchPacks();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, ''],
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const calculateFiscalDeduction = (price: number) => {
    const deduction = price * 0.66;
    const realCost = price - deduction;
    return { deduction, realCost };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  const { deduction, realCost } = calculateFiscalDeduction(formData.price);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Packs de Sponsoring</h1>
          <p className="text-gray-600 mt-1">
            Gérez les packs de partenariat proposés aux sponsors
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Créer un pack
        </button>
      </div>

      {/* Tableau des packs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avantages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sponsors
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
            {packs.map((pack) => (
              <tr key={pack.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-gray-900">{pack.name}</div>
                    {pack.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{pack.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{pack.price}€</div>
                  <div className="text-xs text-gray-500">
                    Coût réel: {(pack.price - pack.price * 0.66).toFixed(0)}€
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {pack.benefits.length} avantage{pack.benefits.length > 1 ? 's' : ''}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{pack.sponsorCount}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pack.active ? (
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
                    onClick={() => handleOpenModal(pack)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pack)}
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

        {packs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucun pack de sponsoring. Créez-en un pour commencer !
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingPack ? 'Modifier le pack' : 'Créer un pack'}
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
                    Nom du pack *
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

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Prix */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (€) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />

                  {/* Calcul déduction fiscale */}
                  {formData.price > 0 && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-blue-900 mb-1">
                        <Calculator className="w-4 h-4" />
                        <span className="font-medium">Déduction fiscale (66%)</span>
                      </div>
                      <div className="text-sm text-blue-800">
                        Réduction : {deduction.toFixed(2)}€
                      </div>
                      <div className="text-sm font-bold text-blue-900 mt-1">
                        <Euro className="w-4 h-4 inline mr-1" />
                        Coût réel pour le sponsor : {realCost.toFixed(2)}€
                      </div>
                    </div>
                  )}
                </div>

                {/* Avantages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avantages inclus *
                  </label>
                  <div className="space-y-2">
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          placeholder="Ex: Logo sur le site web"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.benefits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Ajouter un avantage
                  </button>
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

                {/* Options */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) =>
                        setFormData({ ...formData, active: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Pack actif</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Pack vedette (mis en avant)
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting
                      ? 'Enregistrement...'
                      : editingPack
                      ? 'Enregistrer'
                      : 'Créer'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting}
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
