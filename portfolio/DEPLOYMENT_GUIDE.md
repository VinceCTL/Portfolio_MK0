# Guide de Déploiement du Portfolio

Ce guide vous explique comment déployer votre portfolio sur différentes plateformes.

## Prérequis

-   [ ] Tous les tests de vérification sont passés (voir `CHECKLIST_VERIFICATION.md`)
-   [ ] Le build de production fonctionne (`npm run build`)
-   [ ] Tous les placeholders ont été remplacés
-   [ ] Vous avez un compte sur la plateforme de déploiement choisie

## Option 1 : Déploiement sur Netlify (Recommandé)

Netlify est particulièrement adapté pour les sites Gatsby avec un excellent support.

### Étapes

1. **Préparer le repository**

    ```bash
    git add .
    git commit -m "Portfolio prêt pour le déploiement"
    git push origin main
    ```

2. **Créer un compte Netlify**

    - Allez sur [netlify.com](https://www.netlify.com)
    - Créez un compte (gratuit) ou connectez-vous avec GitHub

3. **Déployer depuis GitHub**

    - Cliquez sur "Add new site" → "Import an existing project"
    - Connectez votre repository GitHub
    - Sélectionnez votre repository portfolio

4. **Configuration du build**

    - **Build command**: `cd portfolio && npm run build`
    - **Publish directory**: `portfolio/public`
    - **Base directory**: `portfolio` (si votre repo est à la racine)

5. **Variables d'environnement**

    - Généralement, aucune variable n'est nécessaire pour un portfolio statique
    - Si vous utilisez des variables, ajoutez-les dans "Site settings" → "Environment variables"

6. **Déploiement**

    - Cliquez sur "Deploy site"
    - Attendez la fin du build (2-5 minutes)
    - Votre site sera accessible sur `votre-site.netlify.app`

7. **Mise à jour de l'URL dans settings.json**
    - Une fois déployé, mettez à jour `siteUrl` dans `portfolio/content/settings.json`
    - Commitez et poussez les changements

### Configuration du Domaine Personnalisé

1. Dans Netlify, allez dans "Domain settings"
2. Cliquez sur "Add custom domain"
3. Suivez les instructions pour configurer votre DNS
4. Netlify gérera automatiquement le certificat SSL

## Option 2 : Déploiement sur Vercel

Vercel offre également un excellent support pour les sites statiques.

### Étapes

1. **Installer Vercel CLI** (optionnel, vous pouvez aussi utiliser l'interface web)

    ```bash
    npm i -g vercel
    ```

2. **Déployer**

    ```bash
    cd portfolio
    vercel
    ```

    - Suivez les instructions interactives
    - Ou utilisez l'interface web sur [vercel.com](https://vercel.com)

3. **Configuration**

    - **Framework Preset**: Gatsby
    - **Build Command**: `npm run build`
    - **Output Directory**: `public`
    - **Install Command**: `npm install` (dans le dossier portfolio)

4. **Déploiement automatique**
    - Vercel détecte automatiquement les changements sur votre branche main
    - Chaque push déclenche un nouveau déploiement

## Option 3 : Déploiement sur GitHub Pages

### Étapes

1. **Installer gh-pages**

    ```bash
    cd portfolio
    npm install --save-dev gh-pages
    ```

2. **Ajouter un script dans package.json**

    ```json
    {
        "scripts": {
            "deploy": "gatsby build && gh-pages -d public -b gh-pages"
        }
    }
    ```

3. **Configurer gatsby-config.js**

    ```javascript
    module.exports = {
        pathPrefix: '/nom-de-votre-repo', // Si votre repo n'est pas à la racine
        // ... autres configurations
    };
    ```

4. **Déployer**

    ```bash
    npm run deploy
    ```

5. **Activer GitHub Pages**
    - Allez dans Settings → Pages de votre repository
    - Sélectionnez la branche `gh-pages`
    - Votre site sera sur `votre-username.github.io/nom-de-votre-repo`

## Configuration Post-Déploiement

### 1. Mettre à jour les URLs

Après le déploiement, mettez à jour dans `portfolio/content/settings.json`:

```json
{
    "siteMetadata": {
        "siteUrl": "https://votre-domaine.com"
    }
}
```

### 2. Vérifier le SEO

-   Testez votre site avec [Google Search Console](https://search.google.com/search-console)
-   Soumettez votre sitemap (généralement `/sitemap.xml`)
-   Vérifiez que les métadonnées Open Graph fonctionnent

### 3. Analytics (Optionnel)

Si vous voulez ajouter Google Analytics:

1. Créez un compte Google Analytics
2. Ajoutez votre ID de tracking dans `gatsby-config.js`:
    ```javascript
    module.exports = {
        plugins: [
            {
                resolve: 'gatsby-plugin-google-analytics',
                options: {
                    trackingId: 'UA-XXXXXXXXX-X',
                },
            },
        ],
    };
    ```
3. Activez le cookie bar dans `settings.json`:
    ```json
    {
        "featureToggles": {
            "useCookieBar": true
        }
    }
    ```

### 4. Performance Monitoring

-   Utilisez [Lighthouse](https://developers.google.com/web/tools/lighthouse) pour tester les performances
-   Configurez des alertes de downtime (Netlify et Vercel offrent cela)
-   Surveillez les erreurs avec des outils comme Sentry (optionnel)

## Déploiement Continu (CI/CD)

Les plateformes modernes (Netlify, Vercel) offrent le déploiement automatique :

-   **Netlify** : Déploie automatiquement à chaque push sur la branche main
-   **Vercel** : Déploie automatiquement à chaque push
-   **GitHub Actions** : Vous pouvez configurer des workflows personnalisés

## Checklist Post-Déploiement

-   [ ] Le site est accessible sur l'URL de production
-   [ ] Toutes les pages se chargent correctement
-   [ ] Les images s'affichent
-   [ ] Les liens fonctionnent
-   [ ] Le formulaire de contact fonctionne (si applicable)
-   [ ] Le téléchargement du CV fonctionne
-   [ ] Le site est responsive sur mobile
-   [ ] Le dark mode fonctionne
-   [ ] Les métadonnées SEO sont correctes
-   [ ] Le site est rapide (testez avec Lighthouse)
-   [ ] Le domaine personnalisé est configuré (si applicable)
-   [ ] Le certificat SSL est actif (automatique sur Netlify/Vercel)

## Résolution de Problèmes

### Le build échoue

1. Vérifiez les logs de build
2. Testez le build en local : `npm run build`
3. Vérifiez les dépendances : `npm install`
4. Vérifiez les erreurs de syntaxe dans les fichiers de contenu

### Les images ne s'affichent pas

1. Vérifiez les chemins relatifs dans les fichiers JSON/MD
2. Assurez-vous que les images existent dans `portfolio/content/images/`
3. Vérifiez les permissions des fichiers

### Le site ne se met pas à jour

1. Vérifiez que vous avez poussé les changements vers GitHub
2. Attendez quelques minutes pour le déploiement
3. Videz le cache de votre navigateur
4. Vérifiez les logs de déploiement

## Support

-   **Documentation Gatsby** : [gatsbyjs.com/docs](https://www.gatsbyjs.com/docs)
-   **Documentation Netlify** : [docs.netlify.com](https://docs.netlify.com)
-   **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)

Bon déploiement ! 🚀
