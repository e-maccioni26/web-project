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
  const [userEmail, setUserEmail] = useState<string>('');

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

    // Récupérer l'email de l'utilisateur connecté
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Supposons que l'utilisateur connecté soit le premier dans la réponse
          setUserEmail(response.data[0].email);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
      }
    };

    fetchProjects();
    fetchUser();
  }, []);

  return (
    <div className="project-page">
      <div className="project-page-header">
        <h1>{userEmail ? `Espace Projet de ${userEmail}` : 'Espace Projet'}</h1>
        <Link to="/add-project" className="new-project-button">
          Nouveau Projet
        </Link>
      </div>
      <p>Voici votre espace utilisateur. Choisissez un projet :</p>
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
