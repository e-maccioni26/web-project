# Gestionnaire de Tâches Collaboratif ✅

---

## Description du projet

Cette application web est un gestionnaire de tâches complet conçu pour permettre aux utilisateurs de créer, organiser et suivre leurs tâches de manière efficace. Que ce soit pour une gestion personnelle ou collaborative, l'application offre des outils puissants pour structurer le travail, suivre l'avancement des projets, et améliorer la productivité.

Chaque tâche peut inclure des détails personnalisés tels qu’un titre, une description, une priorité, une échéance, des tags, et bien plus encore. Pour les projets plus complexes, les tâches peuvent être décomposées en sous-tâches avec une hiérarchie illimitée. 

L'application est également axée sur la collaboration, offrant des fonctionnalités de travail en temps réel et des notifications pour garder toutes les parties prenantes informées.

---

## Fonctionnalités principales
- **Création de tâches** :  
  Les utilisateurs peuvent créer des tâches avec :
  - Un titre.
  - Une description.
  - Une priorité.
  - Une échéance.
  - Des tags.
  - Des informations supplémentaires personnalisées.

- **Organisation des tâches** :  
  Les tâches peuvent être triées et affichées selon plusieurs critères :
  - Par projet.
  - Par liste.
  - Par tag.
  - Par date d’échéance.

- **Modification et suppression** :  
  Les utilisateurs peuvent mettre à jour ou supprimer les informations de leurs tâches à tout moment.

- **Attribution des tâches** :  
  Les utilisateurs peuvent assigner des tâches à d’autres membres pour une gestion collaborative.

- **Suivi de l’avancement** :  
  Chaque tâche a un statut évolutif :  
  - "À faire".
  - "En cours".
  - "Terminée".

- **Notifications** :  
  Les utilisateurs recevront des notifications par email pour :  
  - Les nouvelles attributions de tâches.
  - Les modifications apportées à leurs tâches.

- **Collaboration en temps réel** :  
  - Les utilisateurs peuvent travailler simultanément sur des tâches partagées.
  - Les modifications sont mises à jour instantanément pour tous les participants.

---

## Technologies utilisées 🧑🏽‍💻
### Frontend
- **React.js** :  
  Pour la construction d’une interface utilisateur interactive et réactive.
- **TailwindCSS/Bootstrap** *(au choix)* :  
  Pour un design moderne et responsive.

### Backend
- **Node.js & Express.js** :  
  Pour la gestion des routes API et de la logique métier.
- **JWT (JSON Web Tokens)** :  
  Pour l’authentification sécurisée des utilisateurs.
  

### Base de données
- **Postgresql** :  
  pour un stockage embarqué des données, puis un sequelize pour y accéder.

---

## 🛠 Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Node.js** (v18+ recommandé)
- **Docker** et **Docker Compose** pour la base de données
- **Git** pour cloner le projet

---

## 📦 Installation et Lancement du Projet

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

---

### 2️⃣ Lancer la base de données avec Docker

Dans la racine du projet, exécutez la commande suivante :

```bash
docker-compose up -d
```

Vous pouvez vérifier que les conteneurs sont bien démarrés avec :

```bash
docker ps
```

---

### 3️⃣ Configurer et Lancer le Backend

#### 🔧 Configuration

Accédez au dossier backend :

```bash
cd back
```

Installez les dépendances nécessaires :

```bash
npm install
```

Créez un fichier `.env` dans le dossier `back` si ce n'est pas déjà fait, avec les valeurs suivantes :

```env
DB_NAME=gestion_taches
DB_USER=admin_user
DB_PASSWORD=secure_password
DB_HOST=localhost
DB_PORT=6000
DB_DIALECT=postgres
SALT=default_salt
CRYPTO_KEY=default_crypto_key_12345
JWT_SECRET=default_jwt_secret_key
```

#### 🚀 Lancement du Serveur Backend

Pour lancer le serveur en mode développement :

```bash
npm run dev
```

Pour un environnement de production :

```bash
npm run build
npm start
```

---

### 4️⃣ Configurer et Lancer le Frontend

Accédez au dossier frontend :

```bash
cd ../front
```

Installez les dépendances nécessaires :

```bash
npm install
```

Lancez le serveur en mode développement :

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

Pour le mode production :

```bash
npm run build
npm run preview
```

---

### 5️⃣ Accéder à pgAdmin (Facultatif)

Vous pouvez gérer votre base de données via pgAdmin :

1. Rendez-vous sur [http://localhost:5050](http://localhost:5050).
2. Connectez-vous avec :
   - **Email** : `admin@admin.com`
   - **Mot de passe** : `admin`
3. Ajoutez une connexion PostgreSQL avec les paramètres suivants :
   - **Host** : `postgres`
   - **Port** : `5432`
   - **Database** : `gestion_taches`
   - **Username** : `admin_user`
   - **Password** : `secure_password`

---

## ❓ Résolution des Problèmes

- **Erreur de connexion à la base de données** : Vérifiez que Docker est bien démarré et que les ports sont correctement configurés.
- **Problèmes TypeScript** : Assurez-vous d’avoir installé toutes les dépendances dans les dossiers `back` et `front`.

---

✨ **Vous êtes prêt à utiliser l'application et à collaborer efficacement !** ✨


## Auteur
Développé par [Groupe 2 / Maccioni Elone, Millon Felix, Ian Galmiche, Ilyès Boulkrinat].  

  

