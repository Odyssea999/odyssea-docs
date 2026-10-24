---
id: general
title: Général
---

## Organisation des répertoires

L'API suit une organisation inspirée de l'architecture hexagonale / DDD présente dans le code.

### `src/domain/`
Cœur métier agnostique du framework. Contient les entités métier, les contrats/interfaces (repositories, services) et la logique pure.

### `src/application/`
Orchestration des cas d'utilisation. Contient les services métier, les mappers entre couches et les providers (`*Provider.ts` / modules application).

### `src/infrastructure/`
Détails techniques. Contient les entités TypeORM, les DTOs, les implémentations de repositories, les mappers infra, la configuration, les providers externes (S3, etc.).

### `src/api/`
Couche d'exposition HTTP. Contient les contrôleurs, `ControllerModule`, les réponses (`ActionResponse`) et utilitaires Swagger. Les contrôleurs étendent généralement `AbstractController`.

### `src/socket/`
Communication temps réel. Contient les gateways Socket.IO, services WebSocket et définitions d'événements.

### `src/shared/`
Éléments transversaux. Contient enums, guards, décorateurs (`@Roles`), filtres d'exception globaux, utils, constantes et templates.

### `src/app.module.ts`
Module racine qui importe les modules principaux (`ApplicationProxyModule`, `ControllerModule`, `TypeOrmModule`, etc.) et configure les guards globaux (notamment `ThrottlerGuard`).

## Règles observées dans le code

- **Interfaces vs implémentations** : Les services/repositories sont souvent injectés via des tokens/interfaces (inversion de dépendance). Des modules `*Provider` permettent de lier interface et classe concrète.
- **DTOs** : Les DTOs sont dans `infrastructure/dto/`. La validation est activée globalement via `ValidationPipe` (`transform`, `whitelist`, `forbidNonWhitelisted`).
- **Contrôleurs** : Héritent de `AbstractController` et utilisent `this.execute(...)` pour uniformiser la réponse (`ActionResponse`).
- **Authentification** : `JwtAuthGuard` extrait le token depuis le cookie, vérifie via `JwtHelper` et attache `request.user`. `RoleGuard` s'appuie sur le décorateur `@Roles(...)`.
- **Base de données** : TypeORM avec `autoLoadEntities: true`. Les migrations sont gérées via les scripts npm `migration:*`.
- **Sécurité HTTP** : `helmet`, `compression`, `cookie-parser`, CORS configuré, `trust proxy` activé.
- **API** : Préfixe global `api`, documentation Swagger sur `/docs`.

## Points de vigilance

- Respecter la séparation des couches : `domain` ne doit pas dépendre de `infrastructure`/framework
- Ne pas mettre de logique métier dans les contrôleurs ou dans les entités TypeORM
- Toujours passer par les DTOs pour les entrées/sorties HTTP
- Utiliser les guards/décorateurs existants pour l'authentification et l'autorisation