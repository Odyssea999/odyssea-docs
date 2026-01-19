---
id: entity
title: Entity
---

# Entity

Cette partie décrit **comment créer une entité** dans le projet en respectant les bonnes pratiques.

Nous prendrons l'exemple de **userEntity** pour illustrer chaque étape.

---

## 1. **Choisir un bon nom et mapper vers la base de données**

Utilise `@Entity('table_name')` pour préciser le nom de la table en base de données.  
Le nom doit être clair, en snake_case si besoin.

```typescript
@Entity("user")
export class UserEntity {
  // ...
}
```

✅ **Conseil** : Le nom doit correspondre au domaine métier, pas juste à un terme technique.

---

## 2. **Définir une clé primaire proprement**

Utilise `@PrimaryColumn({ type: 'uuid' })` pour une définition propre.

```typescript
@PrimaryColumn({ type: 'uuid' })
uuid: string;
```

✅ **Conseil** : Utilise toujours `uuid` sauf cas spécifique pour éviter les collisions d'ID.

---

## 3. **Définir les colonnes simples**

Utilise `@Column()` pour mapper les propriétés métiers.  
Précise le type, les contraintes (`nullable`, `unique`, etc.).

```typescript
@Column({ type: "varchar", length: 255 })
firstName: string;
```

✅ **Conseil** :  
- Utilise `nullable: false` par défaut.
- Précise toujours la longueur pour les types texte.
- Utilise `unique` pour tout champ qui doit être unique (ex: `email`).

---

## 4. **Gérer les champs spéciaux (enums, timestamps, relations)**

- **Enums** : Utilise `type: "enum"` pour stocker des énumérations.

```typescript
@Column({ type: "enum", enum: UserRole, default: UserRole.GUEST })
role: UserRole;
```

---

## 5. **Créer les relations propres**

Déclare bien toutes les relations avec `OneToMany`, `ManyToMany`, etc.

Exemples :

- **OneToMany** :

```typescript
@OneToMany(() => PostEntity, (post) => post.user)
posts: PostEntity[];
```

- **ManyToMany** :

```typescript
@ManyToMany(() => CourseEntity, (course) => course.teachers)
@JoinTable()
teachingCourses: CourseEntity[];
```

✅ **Conseil** :  
- Sois explicite dans l'ownership (`@JoinTable` du bon côté).
- Donne des noms clairs aux relations.

---

## 6. **Séparer métier et technique**

Dans ton entité, ne mets que :
- La structure des données
- Les relations entre entités

Pas de logique métier complexe ici (ex : pas de méthode `.register()`, `.calculateScore()` directement dans l'Entity).

✅ **Conseil** : Respecte **Single Responsibility Principle**.

---

## 7. **Architecture propre autour d'une Entity**

**Une bonne Entité** est :

| Caractéristique | Pourquoi c'est important |
|-----------------|---------------------------|
| Simple          | Facilite la lecture/maintenance |
| Typée           | Permet l'autocompletion et moins d'erreurs |
| Reliée proprement | Garantit l'intégrité des données |
| Modulaire       | Facilement réutilisable |
| Sûre            | Sécurité (hash password, vérifications) intégrée |
