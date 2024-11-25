CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL CHECK(LENGTH(nom) <= 100),
    email TEXT NOT NULL UNIQUE CHECK(LENGTH(email) <= 150),
    mot_de_passe TEXT NOT NULL CHECK(LENGTH(mot_de_passe) <= 255),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL CHECK(LENGTH(nom) <= 100),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE taches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL CHECK(LENGTH(titre) <= 255),
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_echeance DATE,
    priorite TEXT NOT NULL DEFAULT 'moyenne' CHECK(priorite IN ('basse', 'moyenne', 'haute')),
    statut TEXT NOT NULL DEFAULT 'à faire' CHECK(statut IN ('à faire', 'en cours', 'terminée')),
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL CHECK(LENGTH(titre) <= 100),
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE taches_tags (
    tag_id INTEGER NOT NULL,
    tache_id INTEGER NOT NULL,
    PRIMARY KEY (tag_id, tache_id),
    FOREIGN KEY (tag_id) REFERENCES tags(id),
    FOREIGN KEY (tache_id) REFERENCES taches(id)
);

CREATE TABLE users_projects (
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    date_affectation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE users_taches (
    user_id INTEGER NOT NULL,
    tache_id INTEGER NOT NULL,
    date_affectation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, tache_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tache_id) REFERENCES taches(id)
);