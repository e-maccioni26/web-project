import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
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
  const { projectId } = useParams<{ projectId: string | undefined}>(); 
  const [task, setTask] = useState<Task | null>(null);
  const navigate = useNavigate();

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
  const deleteTask = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await axios.delete(`http://localhost:3000/taches/${id}`);
        navigate(`/projects/${projectId}`);
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
        alert("Une erreur s'est produite lors de la suppression de la tâche.");
      }
    }
  };
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
      {projectId == null && (
        <Link to="/" className="back-link">Retour à la page d'accueil</Link>
      )}

      {projectId != null && (
        <Link to={`/projects/${projectId}`} className="back-link">
          Retour au projet
        </Link>
        
      )}
      {projectId != null && (
        <Link to={`/tasks/${id}/${projectId}/users`} className="back-link">
          Utilisateurs
        </Link>
      )}
      {projectId != null && (
        <Link to={`/tasks/${id}/${projectId}/tags`} className="back-link">
          Tags
        </Link>
      )}
      <button className="button-delete" onClick={deleteTask}>Supprimer la tâche</button>
    </div>
    
  );
};

export default TaskDetailPage;