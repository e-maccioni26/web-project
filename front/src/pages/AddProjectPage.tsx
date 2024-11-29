import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddProjectPage.css';

const AddProjectPage: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const navigate = useNavigate();

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Création du nouveau projet
            const newProject = {
                nom: projectName,
                description: projectDescription,
            };

            const projectResponse = await axios.post('http://localhost:3000/projects', newProject);

            navigate(`/projects/${projectResponse.data.id}`);
        } catch (error) {
            console.error('Erreur lors de la création du projet :', error);
            alert('Erreur lors de la création du projet. Veuillez réessayer.');
        }
    };

    return (
        <div className="add-project-page">
            <h1>Créer un Nouveau Projet</h1>
            <form onSubmit={handleCreateProject} className="add-project-form">
                <div className="form-group">
                    <label htmlFor="projectName">Nom du Projet</label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="projectDescription">Description du Projet</label>
                    <textarea
                        id="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="create-project-button">
                    Créer le Projet
                </button>
            </form>
            <Link to="/projects" className="back-to-projects-button">
                Retour aux Projets
            </Link>
        </div>
    );
};

export default AddProjectPage;
