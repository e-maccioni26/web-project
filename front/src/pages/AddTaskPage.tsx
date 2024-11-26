import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AddTaskPage.css';

const AddTaskPage: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('todo');

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulation d'envoi de la tâche vers le backend
        const newTask = {
            id: Math.random(), // Génère un ID temporaire
            name: taskName,
            description,
            priority,
            status,
        };

        console.log('Nouvelle tâche créée:', newTask);

        // Rediriger vers la page d'accueil après avoir soumis le formulaire
        navigate('/');
    };

    return (
        <div className="add-task-page">
            <h1>Créer une Nouvelle Tâche</h1>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="taskName">Nom de la Tâche</label>
                    <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priorité</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Statut</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="todo">À faire</option>
                        <option value="in-progress">En cours</option>
                        <option value="done">Terminé</option>
                    </select>
                </div>

                <button type="submit" className="btn-submit">Créer Tâche</button>
            </form>
            <Link to="/" className="back-to-home-button">Retour à la Page d'Accueil</Link>
        </div>
    );
};

export default AddTaskPage;

