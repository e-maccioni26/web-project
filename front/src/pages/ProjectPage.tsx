import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectPage.css';

interface Project {
  id: number;
  nom: string;
  date_creation: Date;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Récupérer les projets depuis l'API
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="project-page">
      <div className="project-page-header">
        <h1>Mes Projets</h1>
        <Link to="/add-project" className="new-project-button">
          Nouveau Projet
        </Link>
      </div>
      <div className="project-page-list">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
            <h2>{project.nom}</h2>
            <p>Date de création : {new Date(project.date_creation).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
