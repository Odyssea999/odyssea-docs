---
id: repository
title: Repository
---
# Repository

## Rôle

Les repositories gèrent l'accès aux données. Dans ce projet, on observe le pattern suivant :
- Contrats/interfaces définis dans `domain/` ou côté application selon le module
- Implémentations concrètes dans `src/infrastructure/repository/` (souvent suffixées `-impl.repository.ts`)
- Utilisation de TypeORM pour interagir avec les entités
- Le service dépend du contrat, pas de l'implémentation

## Organisation

```text
src/infrastructure/repository/
├── user/
├── auth/           # exemple si présent
├── board/
├── course/
├── promotion/
├── attendance/
└── ...
```

## Exemple observé : AuthImplRepository

`src/infrastructure/repository/auth/auth-impl.repository.ts` illustre l'approche :
- Injectable avec `@Injectable()`
- Injection des repositories TypeORM via `@InjectRepository(...)`
- Utilisation de services techniques : `JwtService`, `CryptoSecurity`, `EmailService`, `ConfigService`
- Implémente l'interface correspondante

## Bonnes pratiques

- Ne pas contenir de logique métier dans le repository : uniquement accès/persistance/transformation minimale
- Utiliser les entités TypeORM définies dans `src/infrastructure/entity/`
- Mapper si nécessaire entre entités et modèles de domaine
- Gérer les erreurs de manière cohérente avec le reste de l'application
- Respecter l'unité de travail si utilisée (`infrastructure/shared/uow/`)
