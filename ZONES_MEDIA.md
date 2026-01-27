# ASL Jeux Écossais - Zones Média Ajoutées ✅

## Composants Créés

### MediaGallery (`components/ui/MediaGallery.tsx`)
- Grille responsive (2, 3 ou 4 colonnes)
- Effet hover avec zoom
- **Lightbox modal** : cliquez sur une image pour la voir en plein écran
- Support des légendes optionnelles
- Optimisation automatique des images (Next.js)

## Pages Modifiées

### 1. Page d'Accueil (`/`)
**Section ajoutée** : "Nos Événements en Images"
- **Position** : Entre "Prestations" et "Événement 2025"
- **Images** : 6 photos en grille 3 colonnes
- **Contenu** : Galerie générale des Highland Games

### 2. Page Prestations (`/prestations`)
**2 galeries ajoutées** :

**Démonstrations Publiques**
- 3 photos festivals/événements municipaux
- Grille 3 colonnes

**Corporate & Team Building**
- 3 photos team building/entreprise
- Grille 3 colonnes

### 3. Page Sponsoring (`/sponsoring`)
**Section ajoutée** : "Votre Visibilité sur l'Événement"
- **Position** : Après les paliers tarifaires, avant le formulaire
- **Images** : 4 photos en grille 4 colonnes
- **Contenu** : Exemples de visibilité des partenaires

## Fichiers de Données

### `data/media.ts`
Contient tous les chemins d'images et légendes :
- `homeGalleryImages` : 6 images page d'accueil
- `prestationsImages.demonstrations` : 3 images démos publiques
- `prestationsImages.corporate` : 3 images corporate
- `sponsorImages` : 4 images partenaires

## Structure des Dossiers

```
public/images/
├── home/           # 6 photos homepage
├── prestations/    # 6 photos services
└── sponsors/       # 4 photos visibilité
```

## 📝 Pour Ajouter Vos Images

1. **Placez vos photos** dans les dossiers correspondants (voir `GUIDE_IMAGES.md`)
2. **Nommez-les** selon les noms dans `data/media.ts`
3. **Dimensions recommandées** : 1200x900px (4:3)
4. **C'est tout !** Next.js les optimisera automatiquement

## Fonctionnalités

✅ Grilles responsive adaptées mobile/tablet/desktop  
✅ Animations hover fluides  
✅ Lightbox pour visualisation plein écran  
✅ Légendes optionnelles sur les images  
✅ Optimisation automatique AVIF/WebP (Next.js)  
✅ Chargement lazy par défaut  

## Prochaines Étapes

1. Ajoutez vos vraies photos dans `public/images/`
2. (Optionnel) Personnalisez les légendes dans `data/media.ts`
3. Les images s'afficheront automatiquement !

> **Note** : Tant que les images ne sont pas ajoutées, le site affichera des erreurs 404 pour les chemins d'images. C'est normal. Ajoutez vos photos pour résoudre cela.
