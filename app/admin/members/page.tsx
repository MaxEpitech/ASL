'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Crown,
  Upload,
} from 'lucide-react';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role: string | null;
  position: string | null;
  photo: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  order: number;
  isBoardMember: boolean;
  active: boolean;
}

interface MemberFormData {
  firstName: string;
  lastName: string;
  role: string;
  position: string;
  photo: string;
  bio: string;
  email: string;
  phone: string;
  order: number;
  isBoardMember: boolean;
  active: boolean;
}

const ROLES = [
  { value: '', label: 'Aucun' },
  { value: 'president', label: 'Président' },
  { value: 'vice_president', label: 'Vice-Président' },
  { value: 'treasurer', label: 'Trésorier' },
  { value: 'secretary', label: 'Secrétaire' },
  { value: 'member', label: 'Membre Actif' },
];

const getRoleLabel = (role: string | null) => {
  if (!role) return null;
  const found = ROLES.find((r) => r.value === role);
  return found?.label || role;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<MemberFormData>({
    firstName: '',
    lastName: '',
    role: '',
    position: '',
    photo: '',
    bio: '',
    email: '',
    phone: '',
    order: 0,
    isBoardMember: false,
    active: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/members');
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError('Erreur lors du chargement des membres');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        firstName: member.firstName,
        lastName: member.lastName,
        role: member.role || '',
        position: member.position || '',
        photo: member.photo || '',
        bio: member.bio || '',
        email: member.email || '',
        phone: member.phone || '',
        order: member.order,
        isBoardMember: member.isBoardMember,
        active: member.active,
      });
    } else {
      setEditingMember(null);
      setFormData({
        firstName: '',
        lastName: '',
        role: '',
        position: '',
        photo: '',
        bio: '',
        email: '',
        phone: '',
        order: members.length,
        isBoardMember: false,
        active: true,
      });
    }
    setError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format non supporté. Utilisez PNG, JPG ou WEBP');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Le fichier est trop volumineux (max 2MB)');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de l\'upload');
      }

      const data = await res.json();
      setFormData((prev) => ({ ...prev, photo: data.url }));
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
      const payload = {
        ...formData,
        role: formData.role || null,
        position: formData.position || null,
        photo: formData.photo || null,
        bio: formData.bio || null,
        email: formData.email || null,
        phone: formData.phone || null,
      };

      const url = editingMember
        ? `/api/admin/members/${editingMember.id}`
        : '/api/admin/members';

      const method = editingMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }

      await fetchMembers();
      handleCloseModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (member: Member) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${member.firstName} ${member.lastName}" ?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/members/${member.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      await fetchMembers();
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
          <h1 className="text-3xl font-bold">Membres</h1>
          <p className="text-gray-600 mt-1">
            Gérez les membres du club et du bureau
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter un membre
        </button>
      </div>

      {/* Tableau des membres */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle/Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bureau
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
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.photo ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={`${member.firstName} ${member.lastName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">
                        {member.firstName[0]}{member.lastName[0]}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {member.firstName} {member.lastName}
                  </div>
                  {member.email && (
                    <div className="text-sm text-gray-500">{member.email}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.role ? (
                    <span className="text-sm text-gray-900">{getRoleLabel(member.role)}</span>
                  ) : member.position ? (
                    <span className="text-sm text-gray-900">{member.position}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.isBoardMember && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{member.order}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.active ? (
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
                    onClick={() => handleOpenModal(member)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
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

        {members.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucun membre. Ajoutez-en un pour commencer !
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingMember ? 'Modifier le membre' : 'Ajouter un membre'}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Prénom & Nom */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Rôle au bureau / Position */}
                {formData.isBoardMember ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rôle au bureau
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {ROLES.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      placeholder="Ex: Athlète, Musicien..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Upload photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo
                  </label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG ou WEBP - Max 2MB - Format carré recommandé
                  </p>

                  {formData.photo && (
                    <div className="relative w-24 h-24 mt-2 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={formData.photo}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Biographie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Biographie
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={3}
                    placeholder="Présentation du membre..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email & Téléphone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
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
                      checked={formData.isBoardMember}
                      onChange={(e) =>
                        setFormData({ ...formData, isBoardMember: e.target.checked })
                      }
                      className="rounded"
                    />
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">Membre du bureau</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) =>
                        setFormData({ ...formData, active: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Membre actif</span>
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
                      : editingMember
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
