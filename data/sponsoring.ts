export interface SponsoringTier {
    name: string;
    price: number;
    realCost: number;
    color: string;
    features: string[];
    vipBenefits?: string[];
}

export const sponsoringData = {
    budget: 20000,
    taxReduction: 60,
    tiers: [
        {
            name: 'Platinium',
            price: 1000,
            realCost: 400,
            color: 'from-gray-400 to-gray-600',
            features: [
                'Logo sur affiche officielle',
                'Logo sur bâche événement',
                'Citation micro lors de l\'événement',
                '1 page de publicité programme',
                'PLV illimitée sur site',
                'Pack goodies premium',
                'Stand 3m avec choix emplacement',
                'Flocage logo sur t-shirts équipe',
                'Mention réseaux sociaux (3 posts)',
            ],
            vipBenefits: [
                'Accès coupe-file VIP',
                'Accès buvette VIP',
                'Nuit au golf de Luzarches',
                'Participation remise des trophées',
                'Initiation aux jeux écossais (Heavy Events)',
            ],
        },
        {
            name: 'Or',
            price: 750,
            realCost: 300,
            color: 'from-yellow-400 to-yellow-600',
            features: [
                'Logo sur affiche officielle',
                'Logo sur bâche événement',
                'Citation micro lors de l\'événement',
                '1 page de publicité programme',
                '4 oriflammes sur site',
                'Pack goodies',
                'Stand 2m',
                'Mention réseaux sociaux (2 posts)',
            ],
        },
        {
            name: 'Argent',
            price: 500,
            realCost: 200,
            color: 'from-gray-300 to-gray-500',
            features: [
                'Logo sur affiche officielle',
                'Logo sur bâche événement',
                'Citation micro lors de l\'événement',
                '1/2 page de publicité programme',
                '2 oriflammes sur site',
                'Pack goodies',
                'Mention réseaux sociaux (1 post)',
            ],
        },
        {
            name: 'Bronze',
            price: 250,
            realCost: 100,
            color: 'from-orange-400 to-orange-700',
            features: [
                'Logo sur affiche officielle',
                'Logo sur bâche événement',
                'Citation micro lors de l\'événement',
                '1/4 page de publicité programme',
            ],
        },
    ] as SponsoringTier[],
};
