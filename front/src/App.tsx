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
import ConfigProjectPage from './pages/ConfigProjectPage';
import UserVerification from './components/UserVerification';
import ConfigTacheUsersPage from './pages/ConfigTacheUsersPage';
import ConfigTacheTagsPage from './pages/ConfigTacheTagsPage';
import AddTaskToProjectPage from './pages/AddTaskToProjectPage';
import AddTagToProjectPage from './pages/AddTagToProjectPage';
const App: React.FC = () => {
  return (
    <Router>
      <UserVerification />
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
                        <PrivateRoute>
                          <HomePage />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/add-task" element={<AddTaskPage />} />
                    <Route path="/add-task/:projectId" element={<AddTaskToProjectPage />} />
                    <Route path="/add-tag/:projectId" element={<AddTagToProjectPage />} />
                    <Route path="/tasks/:id" element={<TaskDetailPage />} />
                    <Route path="/tasks/:id/:projectId" element={<TaskDetailPage />} />
                    <Route path="/tasks/:id/:projectId/users" element={<ConfigTacheUsersPage />} />
                    <Route path="/tasks/:id/:projectId/tags" element={<ConfigTacheTagsPage />} />
                    <Route
                      path="/projects"
                      element={
                        <PrivateRoute>
                          <ProjectPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/add-project"
                      element={
                        <PrivateRoute>
                          <AddProjectPage />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/projects/:id" element={<ProjectDetailPage />} />
                    <Route path="/projects/:id/config" element={<ConfigProjectPage />} />
                    {/* Route catch-all pour rediriger vers /login si l'URL est invalide */}
                    <Route path="*" element={<Navigate to="/login" />} />
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
