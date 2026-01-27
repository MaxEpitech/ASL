'use client';

import { useState } from 'react';
import { Calculator, TrendingDown } from 'lucide-react';

export default function FiscalCalculator() {
  const [amount, setAmount] = useState(500);
  const taxReduction = 0.6; // 60%
  const realCost = amount * (1 - taxReduction);
  const savings = amount - realCost;

  return (
    <div className="bg-gradient-to-br from-royal-50 to-white rounded-xl p-8 shadow-xl border border-royal-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-royal-600 rounded-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-royal-700">
          Calculateur d&apos;Avantage Fiscal
        </h3>
      </div>

      <p className="text-gray-600 mb-8">
        Calculez instantanément votre coût réel après réduction d&apos;impôt de 60%
      </p>

      {/* Slider */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Montant de votre don
        </label>
        <input
          type="range"
          min="100"
          max="5000"
          step="50"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-3 bg-royal-200 rounded-lg appearance-none cursor-pointer accent-royal-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>100€</span>
          <span>5000€</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border-2 border-royal-200">
          <div className="text-sm text-gray-600 mb-1">Montant du don</div>
          <div className="text-3xl font-bold text-royal-700">{amount}€</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-2 border-green-200">
          <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            Coût réel
          </div>
          <div className="text-3xl font-bold text-green-700">{realCost}€</div>
        </div>

        <div className="bg-forest-600 rounded-lg p-4 text-white">
          <div className="text-sm text-white/80 mb-1">Vous économisez</div>
          <div className="text-3xl font-bold">{savings}€</div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-royal-100 rounded-lg p-4 border-l-4 border-royal-600">
        <p className="text-sm text-royal-900">
          <strong>Calcul :</strong> Pour un don de <strong>{amount}€</strong>, vous bénéficiez d&apos;une réduction d&apos;impôt de <strong>60%</strong>, soit <strong>{savings}€</strong>.
          <br />
          Votre coût réel : <strong>{amount}€ - {savings}€ = {realCost}€</strong>
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          * Réduction d&apos;impôt de 60% dans la limite de 20 000€ de dons par an (plafond par foyer fiscal)
        </p>
      </div>
    </div>
  );
}
