---
id: migration
title: Migration
---

# Migrations TypeORM

## Commandes disponibles

Dans `odyssea-api/package.json` :

| Commande | Description |
| --- | --- |
| `npm run migration:generate -- <Nom>` | Génère une migration à partir des différences entre entités et schéma |
| `npm run migration:create -- <Nom>` | Crée un fichier de migration vide à compléter manuellement |
| `npm run migration:run` | Applique les migrations en attente |
| `npm run migration:revert` | Annule la dernière migration appliquée |

## Exemples

```bash
npm run migration:generate -- ajout-champ-user
npm run migration:create -- mise-a-jour-custom
npm run migration:run
npm run migration:revert
```

## Bonnes pratiques

- Vérifier la connexion à la base de données avant d'exécuter les migrations
- Utiliser `migration:generate` quand possible à partir des entités TypeORM
- Examiner le fichier de migration généré avant de l'appliquer
- Ne pas modifier une migration déjà appliquée en production : créer une nouvelle migration ou revert puis corriger si nécessaire
- Les entités sont dans `src/infrastructure/entity/` et chargées via `autoLoadEntities: true` dans `AppModule`

