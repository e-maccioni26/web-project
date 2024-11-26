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
import AddTaskPage from './pages/AddTaskPage';
import AddProjectPage from './pages/AddProjectPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
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
                    <Route
                      path="/"
                      element={

                        <HomePage />

                      }
                    />
                    <Route path="/add-task" element={<AddTaskPage />} />
                    <Route path="/tasks/:id" element={<TaskDetailPage />} />
                    <Route
                      path="/projects"
                      element={

                        <ProjectPage />

                      }
                    />
                    <Route
                      path="/add-project"
                      element={
                     
                          <AddProjectPage />
                        
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
