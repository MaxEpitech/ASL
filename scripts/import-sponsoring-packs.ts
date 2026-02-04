// Charger les variables d'environnement en premier
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
});

async function importSponsoringPacks() {
    console.log('🔄 Importation des packs de sponsoring...\n');

    try {
        // Supprimer les anciens packs
        console.log('🗑️  Suppression des anciens packs...');
        await prisma.sponsoringPack.deleteMany();
        console.log('✅ Anciens packs supprimés\n');

        // Packs à importer depuis data/sponsoring.ts
        const packs = [
            {
                name: 'Platinium',
                slug: 'platinium',
                description: 'Notre pack premium avec tous les avantages VIP',
                price: 1000,
                benefits: [
                    'Logo sur affiche officielle',
                    'Logo sur bâche événement',
                    "Citation micro lors de l'événement",
                    '1 page de publicité programme',
                    'PLV illimitée sur site',
                    'Pack goodies premium',
                    'Stand 3m avec choix emplacement',
                    'Flocage logo sur t-shirts équipe',
                    'Mention réseaux sociaux (3 posts)',
                    'Accès coupe-file VIP',
                    'Accès buvette VIP',
                    'Nuit au golf de Luzarches',
                    'Participation remise des trophées',
                    'Initiation aux jeux écossais (Heavy Events)',
                ],
                order: 1,
                active: true,
                featured: true,
            },
            {
                name: 'Or',
                slug: 'or',
                description: 'Pack gold avec excellente visibilité',
                price: 750,
                benefits: [
                    'Logo sur affiche officielle',
                    'Logo sur bâche événement',
                    "Citation micro lors de l'événement",
                    '1 page de publicité programme',
                    '4 oriflammes sur site',
                    'Pack goodies',
                    'Stand 2m',
                    'Mention réseaux sociaux (2 posts)',
                ],
                order: 2,
                active: true,
                featured: false,
            },
            {
                name: 'Argent',
                slug: 'argent',
                description: 'Pack silver avec bonne visibilité',
                price: 500,
                benefits: [
                    'Logo sur affiche officielle',
                    'Logo sur bâche événement',
                    "Citation micro lors de l'événement",
                    '1/2 page de publicité programme',
                    '2 oriflammes sur site',
                    'Pack goodies',
                    'Mention réseaux sociaux (1 post)',
                ],
                order: 3,
                active: true,
                featured: false,
            },
            {
                name: 'Bronze',
                slug: 'bronze',
                description: 'Pack de base pour soutenir notre événement',
                price: 250,
                benefits: [
                    'Logo sur affiche officielle',
                    'Logo sur bâche événement',
                    "Citation micro lors de l'événement",
                    '1/4 page de publicité programme',
                ],
                order: 4,
                active: true,
                featured: false,
            },
        ];

        // Créer les nouveaux packs
        console.log('📦 Création des nouveaux packs...');
        for (const pack of packs) {
            const created = await prisma.sponsoringPack.create({
                data: {
                    ...pack,
                    benefits: JSON.stringify(pack.benefits),
                },
            });
            console.log(`✅ Pack créé : ${created.name} (${created.price}€)`);
        }

        console.log('\n🎉 Importation terminée avec succès !');
        console.log(`\n📊 Total : ${packs.length} packs créés`);
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation :', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

importSponsoringPacks();
