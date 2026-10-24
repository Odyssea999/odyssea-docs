---
id: traduction
title: Traduction
---

# Traduction (ngx-translate)

## Approche

L'application utilise `@ngx-translate/core`. Les fichiers de traduction se trouvent dans `public/i18n/` (ex. `fr.json`, `en.json`).

## Utilisation dans les templates

```html
<!-- Texte simple -->
{{ 'TITRE_PAGE' | translate }}

<!-- Avec paramètres -->
{{ 'BIENVENUE' | translate:{ nom: user.nom } }}

<!-- Attribut -->
<input [placeholder]="'ENTREZ_EMAIL' | translate" />

<!-- HTML -->
<div [innerHTML]="'TEXTE_AVEC_HTML' | translate"></div>
```

## Changement de langue

Via `TranslateService` :

```typescript
import { TranslateService } from '@ngx-translate/core';

constructor(private translate: TranslateService) {}

changeLanguage(lang: string) {
  this.translate.use(lang);
}
```

## Bonnes pratiques

- Éviter les chaînes en dur dans les templates/composants
- Utiliser des clés descriptives et organisées par domaine/fonctionnalité
- Maintenir la cohérence entre les langues
- Utiliser des paramètres pour les valeurs dynamiques
- Préférer le pipe `translate` pour la lisibilité
- Ajouter les nouvelles clés dans tous les fichiers de traduction existants