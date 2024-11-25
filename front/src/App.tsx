import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import ProjectDetailPage from './pages/ProjectDetailPage';
import './App.css';
import Navigation from './components/Navigation';
import TaskDetailPage from './pages/TaskDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Afficher la barre de navigation uniquement si l'utilisateur n'est pas sur les pages Login ou Register */}
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="*"
            element={
              <>
                <Navigation />
                <div className="content-wrapper">
                  <Routes>
                    {/* Routes protégées avec PrivateRoute */}
                    <Route
                      path="/"
                      element={

                        <HomePage />

                      }
                    />
                    <Route path="/tasks/:id" element={<TaskDetailPage />} />
                    <Route
                      path="/projects"
                      element={

                        <ProjectPage />

                      }
                    />
                    <Route path="/projects/:id" element={<ProjectDetailPage />} />
                    {/* Route catch-all pour rediriger vers /login si l'URL est invalide
                    <Route path="*" element={<Navigate to="/login" />} /> */}
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
