import { prisma } from '../lib/prisma';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

async function main() {
    console.log('🌱 Starting database seed...');

    // Clean existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Cleaning existing data...');
    await prisma.blogPostTag.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.blogTag.deleteMany();
    await prisma.blogCategory.deleteMany();
    await prisma.sponsor.deleteMany();
    await prisma.sponsoringPack.deleteMany();
    // await prisma.boardMember.deleteMany(); // Removed as model no longer exists
    await prisma.member.deleteMany();
    await prisma.emailTemplate.deleteMany();
    await prisma.newsletterSubscriber.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin ASL',
            email: 'admin@asl-jeuxecossais.fr',
            password: hashedPassword,
            role: UserRole.ADMIN,
            emailVerified: new Date(),
        },
    });
    console.log(`✅ Admin user created: ${adminUser.email}`);

    // Create blog categories
    console.log('📁 Creating blog categories...');
    const categories = await Promise.all([
        prisma.blogCategory.create({
            data: {
                name: 'Actualités',
                slug: 'actualites',
                description: 'Les dernières nouvelles de l\'ASL',
                color: '#005EB8',
            },
        }),
        prisma.blogCategory.create({
            data: {
                name: 'Événements',
                slug: 'evenements',
                description: 'Nos prochains événements et compétitions',
                color: '#2D5016',
            },
        }),
        prisma.blogCategory.create({
            data: {
                name: 'Histoire & Culture',
                slug: 'histoire-culture',
                description: 'L\'histoire des jeux écossais',
                color: '#8B0000',
            },
        }),
    ]);
    console.log(`✅ Created ${categories.length} blog categories`);

    // Create blog tags
    console.log('🏷️  Creating blog tags...');
    const tags = await Promise.all([
        prisma.blogTag.create({
            data: { name: 'Compétition', slug: 'competition' },
        }),
        prisma.blogTag.create({
            data: { name: 'Highland Games', slug: 'highland-games' },
        }),
        prisma.blogTag.create({
            data: { name: 'Luzarches', slug: 'luzarches' },
        }),
    ]);
    console.log(`✅ Created ${tags.length} blog tags`);

    // Create a sample blog post
    console.log('📝 Creating sample blog post...');
    await prisma.blogPost.create({
        data: {
            title: 'Bienvenue sur le blog de l\'ASL',
            slug: 'bienvenue-blog-asl',
            excerpt: 'Découvrez le nouveau blog de l\'Association Sportive Luzarchoise Jeux Écossais.',
            content: `<h2>Bienvenue sur notre nouveau blog !</h2>
<p>Nous sommes ravis de vous présenter notre nouveau blog où nous partagerons régulièrement des actualités, des articles sur l'histoire des jeux écossais, et des informations sur nos événements à venir.</p>
<p>Restez connectés pour ne rien manquer !</p>`,
            published: true,
            publishedAt: new Date(),
            metaTitle: 'Bienvenue sur le blog ASL Jeux Écossais',
            metaDescription: 'Découvrez le nouveau blog de l\'ASL avec des actualités et articles sur les jeux écossais.',
            authorId: adminUser.id,
            categoryId: categories[0].id,
        },
    });
    console.log('✅ Sample blog post created');

    // Create sponsoring packs
    console.log('💰 Creating sponsoring packs...');
    const packs = await Promise.all([
        prisma.sponsoringPack.create({
            data: {
                name: 'Bronze',
                slug: 'bronze',
                description: 'Pack de base pour les petites entreprises',
                price: 500,
                benefits: JSON.stringify([
                    'Logo sur le site web',
                    'Mention sur les réseaux sociaux',
                    'Invitation à l\'événement annuel',
                ]),
                order: 1,
                active: true,
            },
        }),
        prisma.sponsoringPack.create({
            data: {
                name: 'Argent',
                slug: 'argent',
                description: 'Pack intermédiaire avec visibilité accrue',
                price: 1500,
                benefits: JSON.stringify([
                    'Logo sur le site web (grande taille)',
                    'Stand lors de l\'événement',
                    'Mention régulière sur les réseaux sociaux',
                    '4 invitations VIP',
                ]),
                order: 2,
                active: true,
                featured: true,
            },
        }),
        prisma.sponsoringPack.create({
            data: {
                name: 'Or',
                slug: 'or',
                description: 'Pack premium avec visibilité maximale',
                price: 3000,
                benefits: JSON.stringify([
                    'Logo sur tous les supports de communication',
                    'Stand premium lors de l\'événement',
                    'Partenariat social media',
                    '10 invitations VIP',
                    'Intervention lors de l\'événement',
                ]),
                order: 3,
                active: true,
            },
        }),
    ]);
    console.log(`✅ Created ${packs.length} sponsoring packs`);

    // Create sample sponsors
    console.log('🏢 Creating sample sponsors...');
    await Promise.all([
        prisma.sponsor.create({
            data: {
                name: 'Sponsor Exemple 1',
                logo: '/sponsors/example1.png',
                website: 'https://example.com',
                packId: packs[1].id,
                order: 1,
                active: true,
            },
        }),
        prisma.sponsor.create({
            data: {
                name: 'Sponsor Exemple 2',
                logo: '/sponsors/example2.png',
                website: 'https://example2.com',
                packId: packs[0].id,
                order: 2,
                active: true,
            },
        }),
    ]);
    console.log('✅ Sample sponsors created');

    // Create board members
    console.log('👥 Creating board members...');
    const president = await prisma.member.create({
        data: {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'president@asl-jeuxecossais.fr',
            phone: '06 12 34 56 78',
            bio: 'Président de l\'ASL depuis 2020, passionné de jeux écossais depuis plus de 15 ans.',
            active: true,
            order: 1,
            isBoardMember: true,
            role: 'president', // Using new enum/string values
            position: 'Président',
        },
    });

    const treasurer = await prisma.member.create({
        data: {
            firstName: 'Marie',
            lastName: 'Martin',
            email: 'tresorier@asl-jeuxecossais.fr',
            bio: 'Trésorière de l\'ASL, gère les finances de l\'association avec rigueur.',
            active: true,
            order: 2,
            isBoardMember: true,
            role: 'treasurer',
            position: 'Trésorière',
        },
    });

    console.log(`✅ Created ${2} board members`);

    // Create email templates
    console.log('📧 Creating email templates...');
    await Promise.all([
        prisma.emailTemplate.create({
            data: {
                name: 'contact_confirmation',
                subject: 'Confirmation de votre demande - ASL Jeux Écossais',
                htmlContent: `<h2>Merci pour votre message !</h2>
<p>Bonjour {{name}},</p>
<p>Nous avons bien reçu votre message et nous vous remercions de l\'intérêt que vous portez à l\'ASL Jeux Écossais.</p>
<p>Notre équipe reviendra vers vous dans les plus brefs délais.</p>
<p>Cordialement,<br>L'équipe ASL</p>`,
                textContent: 'Merci pour votre message ! Nous vous recontacterons rapidement.',
                variables: JSON.stringify(['name']),
                active: true,
            },
        }),
        prisma.emailTemplate.create({
            data: {
                name: 'sponsoring_confirmation',
                subject: 'Demande de partenariat - ASL Jeux Écossais',
                htmlContent: `<h2>Demande de partenariat reçue</h2>
<p>Bonjour {{name}},</p>
<p>Nous avons bien reçu votre demande de partenariat pour le pack {{tier}}.</p>
<p>Un membre de notre équipe va étudier votre demande et vous recontacter rapidement.</p>
<p>Cordialement,<br>L'équipe ASL</p>`,
                textContent: 'Demande de partenariat reçue. Nous vous recontacterons rapidement.',
                variables: JSON.stringify(['name', 'tier']),
                active: true,
            },
        }),
    ]);
    console.log('✅ Email templates created');

    console.log('✨ Database seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
