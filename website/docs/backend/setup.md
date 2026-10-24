---
id: setup
title: Configuration
---
# Odyssea Backend

## Configuration de votre espace de travail

Ce guide vous aide à installer et exécuter l'application back-end `odyssea-api` avec **PostgreSQL**, **PgAdmin**, et un **réseau Docker**.

---

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

* **Git** : [Installer Git](https://git-scm.com/)
* **Node.js** : [Installer Node.js](https://nodejs.org/)
* **VS Code** : [Installer VS Code](https://code.visualstudio.com/download)
* **Docker & Docker Compose** : [Installer Docker](https://www.docker.com/get-started)
* **OpenSSL** : Vérifier avec `openssl version` ou installer :
* Debian/Ubuntu : `sudo apt install openssl`
* macOS : `brew install openssl`

---

## 📂 Variables d'environnement

Le projet doit avoir son propre fichier `.env` pour configurer la base de données et les secrets.

**Exemple pour `odyssea-api/.env` :**

```env
# Variables Postgres
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_URI=postgres://<user>:<password>@postgres:5432/<db_name>

# Variables PGAdmin
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

# Variables de port
PORT=3000

# Autres clés et secrets
SALT_LENGTH=
HASH_ALGORITHM=
REFRESH_TOKEN_SECRET_KEY=
PRIVATE_KEY_BASE64=
PUBLIC_KEY_BASE64=

# Mail
EMAIL_HOST=
EMAIL_PORT=
MAIL=
MAIL_PASS=
WEB_URL=
NPM_TOKEN=

```

---

## Lib Interne

1. **Ne jamais commiter le token NPM** dans Git. Il est confidentiel.
2. **Créer un fichier `.npmrc**` à la racine du projet pour permettre l’accès à la librairie privée :

* Récupérez le fichier exemple : `.npmrc.exemple`
* Remplacez `${NPM_TOKEN}` par la valeur de `NPM_TOKEN` dans votre `.env`.
* Exemple de `.npmrc` final :

```ini
//registry.npmjs.org/:_authToken=${NPM_TOKEN}

```

---

## 🚀 Démarrer le projet

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Odyssea999/odyssea-api.git

```

---

### 2️⃣ Lancer les conteneurs

Dans le dossier `odyssea-api/` :

```bash
docker-compose up --build

```

> ⚡ Vérifie que tes logs affichent bien :
> * `odyssea-api` disponible sur [http://localhost:4200](https://www.google.com/search?q=http://localhost:4200)
> * PgAdmin disponible sur [http://localhost:15432](https://www.google.com/search?q=http://localhost:15432)
> 
> 

---

## 🔑 Génération et Encodage des Clés RSA en Base64

Utilisez OpenSSL pour générer une clé privée de 2048 bits et extraire la clé publique correspondante :

### Générer une clé privée (2048 bits)

```sh
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048

```

### Extraire la clé publique depuis la clé privée

```sh
openssl rsa -in private.pem -pubout -out public.pem

```

### Encoder les clés en Base64 et les stocker dans le fichier `.env`

```sh
cat private.pem | base64 > private.pem.b64
cat public.pem | base64 > public.pem.b64

```

Ajoutez ces valeurs directement dans votre fichier `.env` :

```
PRIVATE_KEY_BASE64=<valeur_encodée>
PUBLIC_KEY_BASE64=<valeur_encodée>

```

---

## 🗃️ Vérifier la connexion PostgreSQL avec PGAdmin

1. Connecte-toi à PgAdmin [http://localhost:15432](https://www.google.com/search?q=http://localhost:15432)
2. Crée un **serveur** :
* Nom : `odyssea`
* Hôte : `postgres`
* Port : `5432`
* Utilisateur et mot de passe : selon ton `.env`


3. Si besoin, récupère l’IP du conteneur Postgres :
```bash
docker ps
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ID_CONTAINER

```



---

## ✅ Bonnes pratiques

* `docker-compose down` arrête les conteneurs mais conserve les volumes de données si non spécifié.
* Pour tout nettoyer (données incluses) :
```bash
docker-compose down -v

```