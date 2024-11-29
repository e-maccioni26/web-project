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

README : Comment Lancer le Projet 🚀
Prérequis
Avant de lancer le projet, assurez-vous d’avoir installé les éléments suivants :

Node.js (18+ recommandé)
Docker et Docker Compose pour la base de données
Git (pour cloner le projet si nécessaire)
Étape 1 : Cloner le dépôt
Si vous n'avez pas encore le projet localement, clonez-le avec la commande suivante :

git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
Étape 2 : Lancer la base de données avec Docker
Depuis la racine du projet, lancez la base de données PostgreSQL avec la commande :

docker-compose up -d
Vérifiez que les conteneurs fonctionnent :

docker ps
Étape 3 : Configurer et Lancer le Backend
Accédez au dossier backend :

cd back
Installez les dépendances :

npm install
Configurez l’environnement :
Si le fichier .env n'existe pas, créez-le dans le dossier back avec les valeurs par défaut suivantes :

DB_NAME=gestion_taches
DB_USER=admin_user
DB_PASSWORD=secure_password
DB_HOST=localhost
DB_PORT=6000
DB_DIALECT=postgres
SALT=default_salt
CRYPTO_KEY=default_crypto_key_12345
JWT_SECRET=default_jwt_secret_key
Lancez le serveur en mode développement :

npm run dev
(Optionnel) Pour le mode production :

npm run build
npm start
Étape 4 : Configurer et Lancer le Frontend
Accédez au dossier frontend :

cd ../front
Installez les dépendances :

npm install
Lancez le serveur en mode développement :

npm run dev
L'application sera accessible sur http://localhost:5173.

(Optionnel) Pour construire et prévisualiser le frontend en production :

npm run build
npm run preview
Étape 5 : Accéder à pgAdmin (facultatif)
Rendez-vous sur http://localhost:5050.
Connectez-vous avec les identifiants par défaut :
Email : admin@admin.com
Mot de passe : admin
Ajoutez une connexion PostgreSQL avec :
Host : postgres
Port : 5432
Database : gestion_taches
Username : admin_user
Password : secure_password


## Auteur
Développé par [Groupe 2 / Maccioni Elone, Millon Felix, Ian Galmiche, Ilyès Boulkrinat].  

  

