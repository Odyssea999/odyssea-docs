---
id: setup
title: Configuration
---

# Odyssea Frontend & Admin

## Configuration de votre espace de travail

Ce guide vous aide à installer et exécuter **l'application Frontend** d'Odyssea sur votre système.

---

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

* **Git** : [Télécharger et installer Git](https://git-scm.com/)
* **Node.js** : [Télécharger Node.js](https://nodejs.org/)
* **Angular CLI** : Installer avec la commande suivante :

  ```bash
  npm install -g @angular/cli
  ```
- **VS Code** : [Télécharger VS Code](https://code.visualstudio.com/download)

---

## 🚀 Installation et Exécution

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Odyssea999/odyssea-client-app.git
cd odyssea-client-app
```

## Lib Interne 

1. **Ne jamais commiter le token NPM** dans Git. Il est confidentiel.

2. **Créer un fichier `.npmrc`** à la racine du projet pour permettre l’accès à la librairie privée :

* Récupérez le fichier exemple : `.npmrc.exemple`
* Remplacez `${NPM_TOKEN}` par la valeur de `NPM_TOKEN` dans votre `.env`.
* Exemple de `.npmrc` final :

```ini
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```
---
---

### 2️⃣ Installer les dépendances

```bash
npm install
```

---

### 3️⃣ Lancer l'application

Démarrez le serveur Angular en mode développement :

```bash
ng serve
```

L'application sera accessible via : [http://localhost:4200/](http://localhost:4200/)

---

## ✅ Vérification

Si tout fonctionne correctement, vous devriez voir l'application s'exécuter dans votre navigateur.

En cas de problème, assurez-vous que toutes les dépendances sont bien installées et que vous utilisez la bonne version de Node.js et Angular CLI.

---

### 🎯 Bon développement ! 🚀