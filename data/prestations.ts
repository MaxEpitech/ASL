export interface Service {
    title: string;
    description: string;
    features: string[];
    icon: string;
}

export interface ServiceCategory {
    name: string;
    slug: string;
    description: string;
    services: Service[];
}

export const prestationsData: ServiceCategory[] = [
    {
        name: 'Démonstrations Publiques',
        slug: 'demonstrations-publiques',
        description: 'Animations spectaculaires pour festivals, fêtes de village et événements municipaux.',
        services: [
            {
                title: 'Festivals & Fêtes Médiévales',
                description: 'Démonstrations authentiques de Highland Games pour captiver votre public lors de festivals et événements culturels.',
                features: [
                    'Démonstrations Heavy Events (lancer de tronc, pierre, marteau)',
                    'Animations en kilt traditionnel',
                    'Présentation historique des jeux écossais',
                    'Interaction avec le public',
                    'Stands d\'initiation (selon formule)',
                ],
                icon: 'castle',
            },
            {
                title: 'Événements Municipaux',
                description: 'Animations pour mairies, comités des fêtes et événements locaux.',
                features: [
                    'Spectacle adapté à tous publics',
                    'Démonstrations commentées',
                    'Ateliers découverte pour enfants',
                    'Animations photo en costume',
                ],
                icon: 'building',
            },
        ],
    },
    {
        name: 'Corporate & Team Building',
        slug: 'corporate',
        description: 'Renforcez la cohésion d\'équipe avec des activités originales et challengeantes.',
        services: [
            {
                title: 'Team Building Heavy Events',
                description: 'Activités de cohésion d\'équipe basées sur les épreuves traditionnelles des Highland Games.',
                features: [
                    'Initiations aux Heavy Events (lancer de tronc, pierre, marteau)',
                    'Compétitions par équipes',
                    'Encadrement professionnel et sécurisé',
                    'Remise de trophées',
                    'Sessions photo d\'équipe',
                    'Adaptable à tous niveaux physiques',
                ],
                icon: 'users',
            },
            {
                title: 'Événements d\'Entreprise',
                description: 'Animations uniques pour séminaires, journées portes ouvertes et événements corporate.',
                features: [
                    'Démonstrations spectaculaires',
                    'Ateliers d\'initiation pour collaborateurs',
                    'Branding personnalisé (selon formule sponsoring)',
                    'Adaptable à vos contraintes logistiques',
                ],
                icon: 'briefcase',
            },
        ],
    },
];
