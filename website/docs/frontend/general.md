---
id: general
title: Général
---

# Organisation générale

## Structure dans `src/app/`

D'après le code présent, l'application est organisée ainsi :

```text
src/app/
├── core/          # Services singleton, guards, interceptors, modèles core
├── shared/        # Composants réutilisables, UI, pipes, directives, utils, enums, types
├── pages/         # Pages par fonctionnalité/espace
├── socket/        # Clients Socket.IO
├── app.routes.ts
├── app.config.ts
├── app.component.ts
└── app.module.ts
```

### `core/`
Contient les éléments globaux chargés une fois :
- `services/` (auth, api-routes, navigation, etc.)
- `guards/` (`auth.guard.ts`, `role.guard.ts`)
- `interceptors/` (`api-prefix.interceptor.ts`, `jwt-cookie.interceptor.ts`)
- `models/`, `common/`

### `shared/`
Éléments réutilisables dans toute l'application :
- `ui/` : Composants UI de base (button, input, table, dialog, etc.)
- `components/` : Composants fonctionnels partagés (explorer, board wrapper, etc.)
- `pipes/`, `directives/`, `utils/`, `enums/`, `types/`, `styles/`

### `pages/`
Pages organisées par domaine/fonctionnalité (auth, home, board, courses, pedagogy, attendance, reunions, admin, etc.). Le routage est défini dans `app.routes.ts` avec des routes par espace.

### `socket/`
Logique côté client pour les WebSockets (bridges, providers, événements).

## Routage

Le routage est centralisé dans `app.routes.ts`. On y retrouve notamment des routes par espace (admin, academic, pedagogy) et des routes pour les fonctionnalités principales. Certains parcours utilisent des guards (`auth.guard.ts`, `role.guard.ts`).

## Intercepteurs

- `api-prefix.interceptor.ts` : Ajoute le préfixe API selon la configuration
- `jwt-cookie.interceptor.ts` : Gère l'authentification via cookies/tokens selon le fonctionnement existant

## État

L'état est géré via NgRx et/ou NgRx Signals selon le module (stores présents dans `pages/` ou `shared/`). La logique métier reste dans les services/stores, pas dans les composants.

## Fichiers importants

- `angular.json` - Configuration Angular
- `package.json` - Dépendances et scripts
- `tsconfig.json` - Configuration TypeScript
- `src/environments/` - Configurations par environnement



