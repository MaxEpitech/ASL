'use client';

import { useState, useEffect } from 'react';
import { Check, Crown } from 'lucide-react';

interface SponsoringPack {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  realCost: number;
  benefits: string[];
  featured: boolean;
  order: number;
}

export default function SponsoringTiers() {
  const [packs, setPacks] = useState<SponsoringPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const res = await fetch('/api/sponsoring/packs');
        if (!res.ok) throw new Error('Erreur lors du chargement');
        const data = await res.json();
        setPacks(data);
      } catch (error) {
        console.error('Erreur lors du chargement des packs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Chargement des offres...</div>
      </div>
    );
  }

  if (packs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        Les offres de partenariat seront bientôt disponibles.
      </div>
    );
  }

  // Déterminer la couleur de gradient selon le nom du pack
  const getPackColor = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('bronze')) return 'from-amber-700 to-amber-600';
    if (lowerName.includes('argent') || lowerName.includes('silver')) return 'from-gray-400 to-gray-500';
    if (lowerName.includes('or') || lowerName.includes('gold')) return 'from-yellow-500 to-yellow-600';
    if (lowerName.includes('platine') || lowerName.includes('platinum')) return 'from-royal to-forest';
    return 'from-royal to-forest'; // Défaut
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tax Benefit Info */}
      <div className="bg-gradient-to-r from-royal to-forest text-white rounded-lg p-8 mb-12 text-center">
        <h3 className="text-3xl font-serif font-bold mb-4">
          Avantage Fiscal : 66% de Réduction d&apos;Impôt
        </h3>
        <p className="text-xl mb-2">
          Votre contribution est partiellement déductible de vos impôts !
        </p>
        <p className="text-lg text-white/90">
          Exemple : Pour un don de 1000€, le coût réel après déduction fiscale est de seulement 340€
        </p>
      </div>

      {/* Packs Grid */}
      <div className={`grid grid-cols-1 ${packs.length === 2 ? 'lg:grid-cols-2' : packs.length >= 3 ? 'lg:grid-cols-3' : ''} gap-8`}>
        {packs.map((pack) => {
          const isFeatured = pack.featured;
          const colorClass = getPackColor(pack.name);

          return (
            <div
              key={pack.id}
              className={`relative rounded-xl overflow-hidden shadow-xl ${
                isFeatured ? 'ring-4 ring-royal' : ''
              }`}
            >
              {/* Pack Header */}
              <div className={`bg-gradient-to-r ${colorClass} p-8 relative text-white`}>
                {isFeatured && (
                  <div className="absolute top-4 right-4">
                    <Crown className="w-10 h-10" />
                  </div>
                )}
                <h3 className="text-3xl font-serif font-bold mb-4">{pack.name}</h3>
                <div className="mb-4">
                  <div className="text-5xl font-bold mb-2">{pack.price}€</div>
                  <div className="text-xl">
                    Coût réel après déduction : <span className="font-bold">{pack.realCost}€</span>
                  </div>
                </div>
                {pack.description && (
                  <p className="text-white/90 text-sm mt-4">{pack.description}</p>
                )}
              </div>

              {/* Benefits */}
              <div className="bg-white p-8">
                <div className="space-y-3">
                  {pack.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isFeatured ? 'text-royal' : 'text-forest'}`} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
