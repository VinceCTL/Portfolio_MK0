# Checklist de Vérification du Portfolio

Utilisez cette checklist pour vérifier que tout fonctionne correctement avant le déploiement.

## Tests de Développement

### 1. Lancer le serveur de développement

```bash
cd portfolio
npm run develop
```

### 2. Vérifications Visuelles

-   [ ] **Page d'accueil** : La page se charge sans erreurs
-   [ ] **Section Hero** : Photo, titre, sous-titre et description s'affichent correctement
-   [ ] **Section About** : Contenu markdown s'affiche avec formatage correct
-   [ ] **Section Projects** : Tous les projets visibles s'affichent avec images et descriptions
-   [ ] **Section Skills/Interests** : Les technologies s'affichent avec leurs icônes
-   [ ] **Section Articles** : Les articles de blog s'affichent (si configuré)
-   [ ] **Section Contact** : Informations de contact et liens sociaux s'affichent

### 3. Navigation

-   [ ] **Menu de navigation** : Tous les liens fonctionnent
-   [ ] **Ancres** : Les liens vers les sections (#about, #projects, etc.) fonctionnent
-   [ ] **Bouton CV** : Le téléchargement du CV fonctionne
-   [ ] **Liens sociaux** : GitHub, LinkedIn, Email fonctionnent
-   [ ] **Liens de projets** : Les liens GitHub et démos externes fonctionnent
-   [ ] **Footer** : Les liens Privacy et Imprint fonctionnent

### 4. Responsive Design

-   [ ] **Mobile** : Le site est utilisable sur mobile (testez avec les DevTools)
-   [ ] **Tablette** : Le site s'adapte bien aux tablettes
-   [ ] **Desktop** : Le site est optimal sur grand écran
-   [ ] **Menu mobile** : Le menu hamburger fonctionne sur mobile

### 5. Dark Mode

-   [ ] **Basé sur préférence système** : Le dark mode s'active selon les préférences OS
-   [ ] **Toggle** : Si un toggle existe, il fonctionne correctement
-   [ ] **Contraste** : Le texte est lisible en dark mode

### 6. Console du Navigateur

-   [ ] **Pas d'erreurs JavaScript** : Ouvrez la console (F12) et vérifiez qu'il n'y a pas d'erreurs
-   [ ] **Pas d'erreurs réseau** : Vérifiez l'onglet Network pour les ressources manquantes
-   [ ] **Images chargées** : Toutes les images se chargent correctement

### 7. Performance

-   [ ] **Temps de chargement** : La page se charge rapidement
-   [ ] **Animations** : Les animations sont fluides
-   [ ] **Lazy loading** : Les images se chargent progressivement

## Tests de Build de Production

### 1. Build de Production

```bash
cd portfolio
npm run build
```

### 2. Vérifications du Build

-   [ ] **Pas d'erreurs** : Le build se termine sans erreurs
-   [ ] **Warnings** : Notez les warnings (non bloquants mais à vérifier)
-   [ ] **Fichiers générés** : Le dossier `public/` est créé avec tous les fichiers

### 3. Test du Build Local

```bash
npm run serve
```

-   [ ] **Site accessible** : Le site est accessible sur http://localhost:9000
-   [ ] **Toutes les pages** : Toutes les pages fonctionnent
-   [ ] **Assets** : Tous les assets (images, CSS, JS) se chargent

## Checklist de Contenu

### Informations Personnelles

-   [ ] **Nom** : Votre nom apparaît correctement (Vincent Casteldaccia)
-   [ ] **Email** : Remplacez "your.email@example.com" par votre vrai email
-   [ ] **GitHub** : Remplacez "your-username" par votre vrai username GitHub
-   [ ] **LinkedIn** : Remplacez "your-profile" par votre vrai profil LinkedIn
-   [ ] **Site URL** : Mettez à jour "https://your-portfolio.netlify.app/" avec votre URL réelle

### Projets

-   [ ] **Descriptions** : Les descriptions des projets sont réalistes et détaillées
-   [ ] **Liens GitHub** : Remplacez les liens GitHub par vos vrais projets
-   [ ] **Liens démo** : Ajoutez des liens vers les démos si disponibles
-   [ ] **Images** : Remplacez les images placeholder par de vrais screenshots

### Images

-   [ ] **Photo professionnelle** : Remplacez la photo placeholder par votre photo
-   [ ] **Avatar** : Remplacez l'avatar par votre photo de profil
-   [ ] **Thumbnail** : Ajoutez une image pour les partages sociaux
-   [ ] **Favicon** : Personnalisez le favicon

### Pages Légales

-   [ ] **Privacy** : Vérifiez et personnalisez la politique de confidentialité
-   [ ] **Imprint** : Ajoutez vos vraies informations (adresse, etc.)

## Tests Avant Déploiement

-   [ ] **Tous les placeholders remplacés** : Plus aucun "your-username", "your-email", etc.
-   [ ] **Contenu finalisé** : Tous les textes sont finaux
-   [ ] **Images optimisées** : Les images sont compressées pour le web
-   [ ] **SEO vérifié** : Titres, descriptions, et métadonnées sont optimisés
-   [ ] **CV à jour** : Le CV dans `static/resume.pdf` est à jour

## Outils de Test Recommandés

-   **Lighthouse** : Testez les performances, accessibilité, SEO
-   **Google PageSpeed Insights** : Vérifiez les performances
-   **W3C Validator** : Validez le HTML
-   **Test sur différents navigateurs** : Chrome, Firefox, Safari, Edge

## Prochaines Étapes

Une fois toutes les vérifications effectuées :

1. Commitez vos changements
2. Poussez vers votre repository
3. Configurez le déploiement (Netlify/Vercel)
4. Testez le site en production
5. Configurez votre domaine personnalisé
