---
id: overview  
title: Aperçu  

---

# Aperçu

## Introduction

L'application cliente `odyssea-client-app` est une application web Angular permettant aux utilisateurs d'Odyssea (élèves, enseignants, responsables pédagogiques, administrateurs) d'accéder aux espaces fonctionnels de la plateforme : accueil, emploi du temps, cours, pédagogie, réunions/visioconférence, tableau collaboratif, présence, notifications, etc.

## Stack technique

- **Framework** : Angular 20
- **Langage** : TypeScript
- **État** : NgRx (Store/Effects/Signals) selon les modules
- **Routing** : Angular Router
- **Temps réel** : Socket.IO client
- **Internationalisation** : `@ngx-translate/core`
- **Composants UI** : Bibliothèque de composants personnalisés (`shared/ui/`)
- **Tableau collaboratif** : Intégration Whiteboard (`@odyssea999/whiteboard`)
- **Graphiques** : Chart.js
- **Calendrier** : FullCalendar
- **Tests** : Karma/Jasmine

## Organisation

```text
odyssea-client-app/src/app/
├── core/          # Services globaux, guards, interceptors, modèles
├── shared/        # Composants réutilisables, UI, pipes, directives, utils, enums
├── pages/         # Pages par fonctionnalité/espace
├── socket/        # Clients Socket.IO
├── app.routes.ts
├── app.config.ts
└── app.component.ts
```

## Points clés

- **Centralisation des routes API** : `core/services/api-routes.service.ts` regroupe les endpoints utilisés par les services
- **Intercepteurs** : Gestion du préfixe API et transmission des tokens/cookies selon la configuration
- **Stores par domaine** : L'état est géré localement par domaine (auth, board, cours, promotion, etc.)
- **Composants partagés** : `shared/ui/` contient les composants de base utilisés dans l'application
- **Temps réel** : Intégration Socket.IO pour les fonctionnalités collaboratives et de présence

## Références

- [Angular Documentation](https://angular.io/docs)