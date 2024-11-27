import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectPage.css';

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour récupérer les projets depuis l'API
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des projets. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-page">
      <div className="project-page-header">
        <h1>Mes projets</h1>
        <Link to="/add-project" className="new-project-button">
          Nouveau Projet
        </Link>
      </div>
      <p>Choisissez un projet :</p>
      
      {loading ? (
        <p>Chargement des projets...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="project-page-list">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
              <h2>{project.nom}</h2>
              <p>Date de création : {new Date(project.date_creation).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
