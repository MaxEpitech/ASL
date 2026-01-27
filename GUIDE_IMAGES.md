# ASL Jeux Écossais - Guide Images

## 📸 Comment Ajouter Vos Images

Les zones média ont été ajoutées sur 3 pages principales. Voici où placer vos images :

### Page d'Accueil

**Galerie**: 6 images des Highland Games

Placez vos images dans : `public/images/home/`

Nommez-les :
- `demo-1.jpg` - Lancer de tronc
- `demo-2.jpg` - Marteau écossais
- `demo-3.jpg` - Athlètes en kilt
- `demo-4.jpg` - Public/ambiance
- `demo-5.jpg` - Initiations
- `demo-6.jpg` - Remise trophées

### Page Prestations

**Démonstrations Publiques**: 3 images

Placez dans : `public/images/prestations/`
- `festival-1.jpg` - Festival médiéval
- `festival-2.jpg` - Événement municipal
- `festival-3.jpg` - Stand initiation

**Corporate & Team Building**: 3 images

Placez dans : `public/images/prestations/`
- `team-building-1.jpg` - Team building
- `team-building-2.jpg` - Initiation lancer de pierre
- `corporate-1.jpg` - Séminaire entreprise

### Page Sponsoring

**Visibilité Partenaires**: 4 images

Placez dans : `public/images/sponsors/`
- `event-visibility-1.jpg` - Logos sur site
- `event-visibility-2.jpg` - Stands partenaires
- `event-visibility-3.jpg` - Bannières
- `networking.jpg` - Networking

## 📐 Recommandations Techniques

- **Format** : JPG ou PNG
- **Dimensions recommandées** : 1200x900px (ratio 4:3)
- **Poids max** : 500 KB par image (compressez avec TinyPNG.com si besoin)
- **Optimisation** : Next.js optimisera automatiquement vos images

## ✅ Après Ajout

Une fois vos images ajoutées, elles s'afficheront automatiquement sur le site avec :
- ✓ Grille responsive
- ✓ Effet hover avec zoom
- ✓ Lightbox pour voir en grand
- ✓ Légendes optionnelles

## 🔄 Personnaliser les Légendes

Pour modifier les légendes, éditez le fichier : `data/media.ts`

Exemple :
```typescript
{
  src: '/images/home/demo-1.jpg',
  alt: 'Description pour SEO',
  caption: 'Légende affichée sous l\'image',
}
```

## 🎨 Images Temporaires

Tant que vous n'avez pas ajouté vos images, les galeries afficheront des placeholders bleus avec le texte indiqué dans les données.

Le site reste fonctionnel en attendant vos vraies photos !
