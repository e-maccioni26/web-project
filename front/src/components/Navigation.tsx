import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';
import { FaHome, FaProjectDiagram, FaPlusCircle, FaFolder } from 'react-icons/fa';

const Navigation: React.FC = () => {
  const projects = [
    { id: 1, name: 'My Project 1' },
    { id: 2, name: 'My Project 2' },
    { id: 3, name: 'My Project 3' },
  ];

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
          <NavLink to="/add-task">
            <FaPlusCircle className="nav-icon" />
            Add task
          </NavLink>
        </li>
      </ul>
      {isProjectPage && (
        <>
          <div className="my-projects">
          <div className="divider"></div>
            <h3>
              <FaFolder className="nav-icon" /> My Project
            </h3>
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.id}>
                  <NavLink to={`/projects/${project.id}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    {project.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
