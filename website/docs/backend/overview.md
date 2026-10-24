---
id: overview  
title: Aperçu  

---

# Aperçu

## Introduction

L'API `odyssea-api` est développée avec [NestJS](https://nestjs.com/) (v11), TypeScript et PostgreSQL. Elle expose les endpoints REST utilisés par l'application cliente Angular ainsi que les communications temps réel via Socket.IO.

Le projet suit une organisation inspirée de l'**architecture hexagonale / DDD** : séparation entre `domain`, `application`, `infrastructure`, `api` et `socket`.

## Stack technique

- **Framework** : NestJS 11
- **Langage** : TypeScript
- **Base de données** : PostgreSQL avec TypeORM
- **Authentification** : JWT (RS256) avec guards et rôles
- **Temps réel** : Socket.IO (gateways dans `src/socket/`)
- **Stockage de fichiers** : AWS S3 (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
- **Validation** : `class-validator` / `class-transformer`
- **Documentation API** : Swagger (`@nestjs/swagger`)
- **Observabilité** : OpenTelemetry, Prometheus, Winston/Loki
- **Tests** : Jest

## Organisation

```text
odyssea-api/src/
├── api/           # Contrôleurs HTTP, modules
├── application/   # Services métier, mappers
├── domain/        # Entités métier et contrats
├── infrastructure/# DTOs, entités TypeORM, repositories, providers
├── socket/        # Gateways et événements WebSocket
├── shared/        # Guards, décorateurs, enums, utils, filtres
└── main.ts
```

## Domaines fonctionnels présents

L'API couvre les fonctionnalités utilisées par Odyssea : authentification/utilisateurs, promotions, cours/chapitres/items, emploi du temps, présence/appels, tableaux blancs collaboratifs (boards), sessions de visioconférence, notifications, explorateur/fichiers, etc.

## Sécurité

- Authentification par **JWT RS256** (clés privée/publique)
- Guards dédiés (`JwtAuthGuard`, `RolesGuard`) et décorateurs pour les rôles
- Validation des DTOs via `ValidationPipe` global
- Gestion des refresh tokens

## Références

- [NestJS Documentation](https://docs.nestjs.com/)
