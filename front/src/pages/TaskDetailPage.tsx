import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/TaskDetailPage.css';

const tasks = [
  { id: 1, title: 'Task 1', status: 'To Do', description: 'Description of Task 1' },
  { id: 2, title: 'Task 2', status: 'In Progress', description: 'Description of Task 2' },
  { id: 3, title: 'Task 3', status: 'Done', description: 'Description of Task 3' },
  { id: 4, title: 'Task 4', status: 'To Do', description: 'Description of Task 4' },
  { id: 5, title: 'Task 5', status: 'In Progress', description: 'Description of Task 5' },
];

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const task = tasks.find((t) => t.id === parseInt(id || ''));

  if (!task) {
    return <p>Tâche non trouvée</p>;
  }

  return (
    <div className="task-detail-page">
      <h1>{task.title}</h1>
      <p><strong>Description :</strong> {task.description}</p>
      <p><strong>Status :</strong> {task.status}</p>
      <Link to="/" className="back-link">Retour à la page d'accueil</Link>
    </div>
  );
};

export default TaskDetailPage;
