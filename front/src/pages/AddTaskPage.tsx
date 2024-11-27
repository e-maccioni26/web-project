import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddTaskPage.css';

const AddTaskPage: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('basse');
    const [status, setStatus] = useState('à faire');
    const [dueDate, setDueDate] = useState('');
    const [tag, setTag] = useState('');
    const [projectId, setProjectId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Vérifier que la date d'échéance n'est pas déjà passée
        if (dueDate && new Date(dueDate) < new Date()) {
            alert("La date d'échéance ne peut pas être une date passée.");
            return;
        }

        try {
            // Création de la nouvelle tâche et envoi vers le backend
            const newTask = {
                titre: taskName,
                description,
                date_echeance: dueDate,
                priorite: priority,
                statut: status,
                project_id: parseInt(projectId, 10),
                tags: [tag], // Ajouter le tag comme un tableau de tags
            };

            console.log('Nouvelle tâche envoyée:', newTask); // Ajoutez cette console pour vérifier les données avant l'envoi.

            const response = await axios.post('http://localhost:3000/taches', newTask);

            if (response.status === 201) {
                alert('Tâche créée avec succès');
                // Rediriger vers la page du projet après la création de la tâche
                navigate(`/projects/${projectId}`);
            } else {
                alert("Erreur lors de la création de la tâche. Veuillez vérifier les données.");
            }
        } catch (error: any) {
            console.error('Erreur lors de la création de la tâche :', error);
            if (error.response && error.response.data) {
                console.error('Détails de l\'erreur :', error.response.data);
            }
            alert('Erreur lors de la création de la tâche. Veuillez réessayer.');
        }
    };

    return (
        <div className="add-task-page">
            <h1>Créer une Nouvelle Tâche</h1>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="projectId">ID du Projet</label>
                    <input
                        type="number"
                        id="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                    />
                </div>

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
                    <label htmlFor="dueDate">Date Échéance</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priorité</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="basse">Faible</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Statut</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="à faire">A faire</option>
                        <option value="en cours">En cours</option>
                        <option value="terminée">Terminée</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        id="tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Par exemple: v1, front, urgent"
                    />
                </div>

                <button type="submit" className="btn-submit">Créer Tâche</button>
            </form>
            <Link to="/" className="back-to-home-button">Retour à la Page d'Accueil</Link>
        </div>
    );
};

export default AddTaskPage;
