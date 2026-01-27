// Placeholder image data - Replace with your actual images
export const homeGalleryImages = [
    {
        src: '/images/home/demo-1.jpg',
        alt: 'Démonstration de lancer de tronc aux Highland Games',
        caption: 'Lancer de tronc - Luzarches 2024',
    },
    {
        src: '/images/home/demo-2.jpg',
        alt: 'Compétition de marteau écossais',
        caption: 'Épreuve du marteau écossais',
    },
    {
        src: '/images/home/demo-3.jpg',
        alt: 'Athlètes en kilt traditionnel',
        caption: 'Nos athlètes en costume traditionnel',
    },
    {
        src: '/images/home/demo-4.jpg',
        alt: 'Public aux Highland Games de Luzarches',
        caption: 'Ambiance festive à Luzarches',
    },
    {
        src: '/images/home/demo-5.jpg',
        alt: 'Initiation du public aux jeux écossais',
        caption: 'Initiations pour tous',
    },
    {
        src: '/images/home/demo-6.jpg',
        alt: 'Remise des trophées Highland Games',
        caption: 'Cérémonie de remise des trophées',
    },
];

export const prestationsImages = {
    demonstrations: [
        {
            src: '/images/prestations/festival-1.jpg',
            alt: 'Démonstration lors d\'un festival médiéval',
            caption: 'Festival médiéval - Spectacle captivant',
        },
        {
            src: '/images/prestations/festival-2.jpg',
            alt: 'Animation municipale Highland Games',
            caption: 'Événement municipal - Grande affluence',
        },
        {
            src: '/images/prestations/festival-3.jpg',
            alt: 'Stand d\'initiation aux jeux écossais',
            caption: 'Ateliers découverte pour le public',
        },
    ],
    corporate: [
        {
            src: '/images/prestations/team-building-1.jpg',
            alt: 'Team building Heavy Events en entreprise',
            caption: 'Team Building - Cohésion d\'équipe',
        },
        {
            src: '/images/prestations/team-building-2.jpg',
            alt: 'Initiation lancer de pierre en entreprise',
            caption: 'Initiation aux Heavy Events',
        },
        {
            src: '/images/prestations/corporate-1.jpg',
            alt: 'Événement d\'entreprise avec démonstrations',
            caption: 'Séminaire d\'entreprise - Animation unique',
        },
    ],
};

export const sponsorImages = [
    {
        src: '/images/sponsors/event-visibility-1.jpg',
        alt: 'Visibilité des sponsors sur l\'événement',
        caption: 'Vos logos en évidence sur le site',
    },
    {
        src: '/images/sponsors/event-visibility-2.jpg',
        alt: 'Stands partenaires Highland Games',
        caption: 'Espace dédié aux partenaires',
    },
    {
        src: '/images/sponsors/event-visibility-3.jpg',
        alt: 'Bannières sponsors aux Highland Games',
        caption: 'Visibilité maximale auprès du public',
    },
    {
        src: '/images/sponsors/networking.jpg',
        alt: 'Networking entre partenaires',
        caption: 'Opportunités de networking',
    },
];

// Helper function to create placeholder images (for development)
export function getPlaceholderImage(width: number, height: number, text: string): string {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='%23005EB8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23ffffff'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
}
