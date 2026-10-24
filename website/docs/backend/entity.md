---
id: entity
title: Entity
---

# Entity (TypeORM)

## Emplacement

Les entités TypeORM se trouvent dans `src/infrastructure/entity/`, organisées par domaine (ex. `user/`, `educatif/`, `board/`, `storage/`, `notification/`).

## Bonnes pratiques observées

- **Nom de table** : Utiliser `@Entity('table_name')` pour expliciter le nom de table
- **Clé primaire** : Généralement un `uuid` avec `@PrimaryColumn({ type: 'uuid' })` ou `@PrimaryGeneratedColumn('uuid')` selon l'entité
- **Colonnes** : Déclarer le type explicitement, utiliser `nullable`, `unique`, `length` si pertinent
- **Enums** : Utiliser `@Column({ type: 'enum', enum: ..., default: ... })` avec les enums de `src/shared/enums/`
- **Relations** : Définir clairement les relations (`OneToMany`, `ManyToOne`, `ManyToMany`) avec les entités correspondantes
- **Timestamps** : Ajouter `@CreateDateColumn()` / `@UpdateDateColumn()` si nécessaire
- **Séparation** : L'entité ne doit contenir que la structure et les relations. La logique métier appartient à `domain/` ou `application/`

## Exemples dans le code

- `src/infrastructure/entity/user/user.entity.ts`
- `src/infrastructure/entity/educatif/promotion/promotion.entity.ts`
- `src/infrastructure/entity/board/board.entity.ts`
- `src/infrastructure/entity/storage/storage-item.entity.ts`

## Migrations

Les entités sont utilisées par TypeORM pour générer/exécuter les migrations. Utiliser les scripts :

```bash
npm run migration:generate -- <NomDeLaMigration>
npm run migration:run
npm run migration:revert
```
