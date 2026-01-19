---
id: general
title: Général
---
## 📁 Organisation des Répertoires

L'organisation des répertoires suit les principes de la séparation des responsabilités tout en intégrant les concepts de l'architecture **Domain-Driven Design (DDD)**. Cette structure assure que la logique métier reste isolée des détails techniques.

### `Domain` Directory (Noyau)

Ce répertoire constitue le cœur de l'application. Il est **agnostique** (ne doit dépendre d'aucun framework ou bibliothèque externe).

* **`Models` ou `Entity**` :
* Définit les entités métier et les schémas de données (ex. : table `User`).


* **`Repository`** :
* Contient uniquement les **interfaces** (contrats). Cela définit *ce que* le système peut faire avec les données sans préciser *comment* (ex: `IUserRepository`).



### `Infrastructure` Directory (Détails techniques)

Ce répertoire gère la communication avec les outils externes (Base de données, API tierces).

* **`Dto` (Data Transfer Objects)** :
* Objets structurés pour l'entrée et la sortie des données (ex. : `AuthLoginDto`, `UserReadDto`).


* **`Repository`** :
* **Implémentations** concrètes des interfaces du `Domain` (ex: utilisation de TypeORM ou Prisma pour requêter la base).


* **`Mapper`** :
* Classes de transformation. Exemple : conversion d'une `UserEntity` (DB) en un `UserReadDto` (API) pour masquer les mots de passe.


* **`Config`** :
* Configurations spécifiques (Schémas, TypeORM, connexions Redis/MongoDB).



### `Application` Directory (Logique métier)

Ce répertoire orchestre les cas d'utilisation de l'application.

* **`Services`** :
* Contient la logique métier pure (ex: `AuthService`). C'est ici que l'on manipule les dépôts pour répondre à un besoin utilisateur.


* **`Common`** :
* Utilitaires, décorateurs personnalisés, ou constantes partagés entre les services.



### `Api` Directory (Exposition)

C'est la porte d'entrée de l'application (couche de transport).

* **`Controller`** :
* Définit les routes HTTP, gère les requêtes entrantes et renvoie les réponses. Il appelle les services de la couche `Application`.



### `Socket` Directory

* **`Gateways` & `Events**` :
* Regroupe tous les éléments liés à la communication temps réel (WebSockets), séparés du flux HTTP classique.



---

### 📖 Pour plus d'informations

Consultez la [documentation officielle de NestJS](https://docs.nestjs.com/) pour approfondir la gestion des modules et des fournisseurs de données.

---

### 🎯 Bon développement ! 🚀

Souhaitez-vous que je détaille également l'arborescence des fichiers pour un module spécifique (ex: le module `Auth`) ?