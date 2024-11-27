import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AddTaskPage.css';
import axios from 'axios';

const AddTaskPage: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('moyenne');
  const [status, setStatus] = useState('à faire');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      titre: taskTitle,
      description: taskDescription,
      priorite: priority,
      statut: status,
      date_creation: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:3000/taches', newTask);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }
  };

  return (
    <div className="add-task-page">
      <h1>Ajouter une Nouvelle Tâche</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="taskTitle">Titre de la tâche :</label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Priorité :</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
        </div>
        <div>
          <label>Statut :</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminé</option>
          </select>
        </div>
        <button className="btn-submit" type="submit">Ajouter la Tâche</button>
      </form>
      <Link to="/" className="back-to-home-button">Retour à la Page d'Accueil</Link>
    </div>
  );
};

export default AddTaskPage;