import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';

const ProjectPage: React.FC = () => {
  const projects = [
    { id: 1, name: 'My Project 1', description: 'Description : Projet 1' },
    { id: 2, name: 'My Project 2', description: 'Description : Projet 2' },
    { id: 3, name: 'My Project 3', description: 'Description : Projet 3' },
  ];

  return (
    <div className="project-page">
      <div className="project-page-header">
        <h1>Bienvenue {"{User}"}</h1>
        <Link to="/add-project" className="new-project-button">
          Nouveau Projet
        </Link>
      </div>
      <p>Voici votre espace utilisateur. Choisissez un projet :</p>
      <div className="project-page-list">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
