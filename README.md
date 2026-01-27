# ASL Jeux Écossais - Site Web

Site officiel de l'Association Sportive Luzarchoise Jeux Écossais, construit avec Next.js 15, React 19, et Tailwind CSS.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
ASL/
├── app/                          # App Router Next.js
│   ├── page.tsx                  # Page d'accueil
│   ├── association/              # Page association
│   ├── evenement/
│   │   └── luzarches-2025/       # Page événement 2025
│   ├── prestations/              # Catalogue services
│   ├── sponsoring/               # Page partenaires
│   ├── api/
│   │   └── contact/              # API route formulaire contact
│   ├── layout.tsx                # Layout racine
│   └── globals.css               # Styles globaux
├── components/
│   ├── ui/                       # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   ├── layout/                   # Composants layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/                     # Composants page d'accueil
│   ├── prestations/              # Composants prestations
│   └── sponsoring/               # Composants sponsoring
├── data/                         # Données structurées
│   ├── prestations.ts
│   └── sponsoring.ts
└── public/                       # Assets statiques
```

## 🎨 Design System

### Couleurs

- **Royal Blue** (`#005EB8`): Couleur principale (CTA, titres)
- **Forest Green** (`#2D5016`): Couleur secondaire
- **Blanc** : Arrière-plans et texte sur fonds colorés

### Typographie

- **Titres** : Roboto Slab (serif)
- **Corps de texte** : Inter (sans-serif)

## 📄 Pages

### 1. Accueil (`/`)
- Hero avec vidéo (à ajouter)
- Aperçu prestations
- Événement Luzarches 2025
- CTA sponsoring

### 2. Association (`/association`)
- Histoire de l'association
- Valeurs
- Équipe (à personnaliser)

### 3. Événement (`/evenement/luzarches-2025`)
- Informations pratiques
- Programme détaillé
- Accès et parkings

### 4. Prestations (`/prestations`)
- Démonstrations publiques
- Événements privés (mariages)
- Corporate & Team Building

### 5. Sponsoring (`/sponsoring`)
- Grille tarifaire partenaires
- Avantage fiscal 60%
- Formulaire de contact

## 🔧 Configuration

### Vidéo Hero (Homepage)

Pour ajouter votre vidéo, placez-la dans `public/videos/hero.mp4` et décommentez les lignes dans `components/home/HeroSection.tsx`.

### Email (Formulaire Contact)

Le formulaire de contact nécessite la configuration d'un service d'envoi d'email :

1. **Option 1 - Resend** (recommandé)
```bash
npm install resend
```
Ajoutez votre clé API dans `.env.local`:
```
RESEND_API_KEY=your_key_here
```

2. **Option 2 - SendGrid**
```bash
npm install @sendgrid/mail
```

3. **Option 3 - Nodemailer** (SMTP)
```bash
npm install nodemailer
```

Puis décommentez et configurez le code dans `app/api/contact/route.ts`.

### Variables d'Environnement

Créez un fichier `.env.local` :

```env
# Email Service
RESEND_API_KEY=your_resend_api_key
# ou
SENDGRID_API_KEY=your_sendgrid_key

# Optional: Analytics, etc.
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🚀 Déploiement

### Build de Production

```bash
npm run build
npm start
```

### Déployer sur Vercel

Le moyen le plus simple de déployer votre application Next.js est d'utiliser [Vercel](https://vercel.com).

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres Plateformes

Compatible avec :
- Netlify
- AWS Amplify
- Cloudflare Pages
- Serveur Node.js classique

## 📝 Scripts Disponibles

- `npm run dev` : Serveur de développement (Turbopack)
- `npm run build` : Build de production
- `npm run start` : Démarrer en production
- `npm run lint` : Linter ESLint
- `npm run type-check` : Vérification TypeScript

## 🎯 SEO

Le site est optimisé pour le SEO avec :
- Metadata structurées sur chaque page
- Balises Open Graph
- Structure sémantique HTML5
- Images optimisées (next/image)

## 📱 Responsive

Le site est entièrement responsive avec des breakpoints Tailwind :
- Mobile : < 768px
- Tablet : 768px - 1024px
- Desktop : > 1024px

## 🤝 Contribution

Pour toute question ou suggestion :
- Email : contact@asl-jeuxecossais.fr
- Sponsoring : sponsoring@asl-jeuxecossais.fr

## 📄 Licence

© 2025 ASL Jeux Écossais. Tous droits réservés.
