# Images à Remplacer

Ce document liste les images qui devraient être remplacées par vos propres images pour un portfolio entièrement personnalisé.

## Images Prioritaires à Remplacer

### 1. Photo Professionnelle (Hero Section)

-   **Fichier actuel**: `portfolio/content/images/charles-deluvio-DgoyKNgPiFQ-unsplash.jpg`
-   **Utilisé dans**:
    -   `portfolio/content/sections/hero/hero.json` (heroPhoto)
    -   `portfolio/content/sections/about/about.md` (imageSrc)
-   **Recommandation**: Remplacez par votre photo professionnelle (format JPG, recommandé 800x800px minimum)

### 2. Avatar (Settings)

-   **Fichier actuel**: `portfolio/content/images/gatsby.png`
-   **Utilisé dans**: `portfolio/content/settings.json` (avatar)
-   **Recommandation**: Remplacez par votre avatar/photo de profil (format PNG avec fond transparent, 200x200px)

### 3. Thumbnail (SEO/Social Media)

-   **Fichier actuel**: `portfolio/content/images/clement-h-95YRwf6CNw8-unsplash.jpg`
-   **Utilisé dans**: `portfolio/content/settings.json` (thumbnail)
-   **Recommandation**: Image pour les partages sociaux (1200x630px, format JPG)

### 4. Favicon

-   **Fichier actuel**: `portfolio/content/images/favicon.png`
-   **Utilisé dans**: `portfolio/content/sections/contact/contact.json`
-   **Recommandation**: Votre logo ou initiales (32x32px ou 64x64px, format PNG)

## Images de Projets (Optionnel mais Recommandé)

Les images suivantes sont utilisées pour les projets dans `portfolio/content/sections/projects/projects.json`:

1. **Projet Angular**: `clement-h-95YRwf6CNw8-unsplash.jpg` → Remplacez par un screenshot de votre projet
2. **Projet React/Next.js**: `kelly-sikkema-Hl3LUdyKRic-unsplash.jpg` → Remplacez par un screenshot de votre projet
3. **Projet Node.js**: `gatsby.png` → Remplacez par un screenshot de votre projet
4. **Projet Collaboration**: `notebook.png` → Remplacez par un screenshot de votre projet

## Images d'Articles de Blog (Optionnel)

Les images de bannière pour les articles peuvent être remplacées:

-   `building-scalable-angular-apps/index.md` → `clement-h-95YRwf6CNw8-unsplash.jpg`
-   `typescript-best-practices/index.md` → `kelly-sikkema-Hl3LUdyKRic-unsplash.jpg`
-   `remote-work-developer/index.md` → `charles-deluvio-DgoyKNgPiFQ-unsplash.jpg`

## Instructions pour Remplacer

1. Placez votre nouvelle image dans `portfolio/content/images/`
2. Mettez à jour le chemin dans le fichier correspondant
3. Assurez-vous que le nom du fichier correspond exactement
4. Optimisez les images pour le web (compression, bonnes dimensions)

## Outils Recommandés

-   **Compression d'images**: TinyPNG, ImageOptim, Squoosh
-   **Redimensionnement**: GIMP, Photoshop, ou outils en ligne
-   **Conversion de format**: Utilisez des outils en ligne si nécessaire
