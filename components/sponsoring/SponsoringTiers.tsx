import { sponsoringData, SponsoringTier } from '@/data/sponsoring';
import { Check, Crown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SponsoringTiers() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Tax Benefit Info */}
      <div className="bg-gradient-to-r from-royal to-forest text-white rounded-lg p-8 mb-12 text-center">
        <h3 className="text-3xl font-serif font-bold mb-4">
          Avantage Fiscal : 60% de Réduction d&apos;Impôt
        </h3>
        <p className="text-xl mb-2">
          Votre contribution est partiellement déductible de vos impôts !
        </p>
        <p className="text-lg text-white/90">
          Exemple : Pour un don de 1000€, le coût réel après déduction fiscale est de seulement 400€
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sponsoringData.tiers.map((tier: SponsoringTier) => {
          const isPlatinium = tier.name === 'Platinium';
          
          return (
            <div
              key={tier.name}
              className={`relative rounded-xl overflow-hidden shadow-xl ${
                isPlatinium ? 'ring-4 ring-royal' : ''
              }`}
            >
              {/* Tier Header */}
              <div className={`bg-gradient-to-r ${tier.color} text-white p-8 relative`}>
                {isPlatinium && (
                  <div className="absolute top-4 right-4">
                    <Crown className="w-10 h-10" />
                  </div>
                )}
                <h3 className="text-3xl font-serif font-bold mb-4">{tier.name}</h3>
                <div className="mb-4">
                  <div className="text-5xl font-bold mb-2">{tier.price}€</div>
                  <div className="text-xl">
                    Coût réel après déduction : <span className="font-bold">{tier.realCost}€</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white p-8">
                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* VIP Benefits for Platinium */}
                {tier.vipBenefits && (
                  <div className="pt-6 border-t-2 border-royal/20">
                    <h4 className="text-xl font-serif font-bold text-royal mb-4 flex items-center gap-2">
                      <Crown className="w-6 h-6" />
                      Avantages VIP
                    </h4>
                    <div className="space-y-3">
                      {tier.vipBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-royal mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h4 className="text-2xl font-serif font-bold text-center mb-6 text-royal">
          Budget Global de l&apos;Événement
        </h4>
        <p className="text-center text-gray-700 text-lg mb-4">
          Budget total nécessaire : <span className="font-bold text-2xl text-royal">{sponsoringData.budget.toLocaleString()}€</span>
        </p>
        <p className="text-center text-gray-600">
          Votre contribution nous aide à organiser un événement de qualité et à promouvoir la culture écossaise en France.
        </p>
      </div>
    </div>
  );
}
