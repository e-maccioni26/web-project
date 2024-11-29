import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navigation.css';
import { FaHome, FaProjectDiagram, FaPlusCircle, FaFolder, FaSignOutAlt } from 'react-icons/fa';

interface Project {
  id: number;
  nom: string;
}

const Navigation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsLoggedIn(response.status === 200);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    // Récupérer les projets de l'utilisateur
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      }
    };

    if (isLoggedIn) {
      fetchProjects();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/projects');

  return (
    <nav className="navigation">
      <div className="navigation-header">
        <h2>Project Web</h2>
      </div>
      <ul className="navigation-links">
        <li>
          <NavLink to="/">
            <FaHome className="nav-icon" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects">
            <FaProjectDiagram className="nav-icon" />
            Projects
          </NavLink>
        </li>
        <li>
          {/* <NavLink to="/add-task">
            <FaPlusCircle className="nav-icon" />
            Add task
          </NavLink> */}
        </li>
      </ul>
      {isProjectPage && projects.length > 0 && (
        <>
          <div className="my-projects">
            <div className="divider"></div>
            <h3>
              <FaFolder className="nav-icon" /> My Projects
            </h3>
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.id}>
                  <NavLink to={`/projects/${project.id}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    {project.nom}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" /> Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
