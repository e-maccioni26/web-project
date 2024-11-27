import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/TaskDetailPage.css';
import axios from 'axios';

interface Task {
  id: number;
  titre: string;
  description: string;
  statut: string;
  priorite: string;
  date_creation: string;
  date_echeance: string;
}

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/taches/${id}`) 
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!task) {
    return <p>Chargement des détails de la tâche...</p>;
  }

  return (
    <div className="task-detail-page">
      <h1>{task.titre}</h1>
      <p><strong>Description :</strong> {task.description}</p>
      <p><strong>Statut :</strong> {task.statut}</p>
      <p><strong>Priorité :</strong> {task.priorite}</p>
      <p><strong>Date de création :</strong> {task.date_creation}</p>
      <p><strong>Date d'échéance :</strong> {task.date_echeance}</p>
      <Link to="/" className="back-link">Retour à la page d'accueil</Link>
    </div>
  );
};

export default TaskDetailPage;