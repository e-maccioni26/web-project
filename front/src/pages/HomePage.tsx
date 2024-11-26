import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const tasks = [
  { id: 1, title: 'Task 1', status: 'To Do', description: 'Description of Task 1' },
  { id: 2, title: 'Task 2', status: 'In Progress', description: 'Description of Task 2' },
  { id: 3, title: 'Task 3', status: 'Done', description: 'Description of Task 3' },
  { id: 4, title: 'Task 4', status: 'To Do', description: 'Description of Task 4' },
  { id: 5, title: 'Task 5', status: 'In Progress', description: 'Description of Task 5' },
];

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Bienvenue {"{User}"}</h1>
      <p>Voici la liste de toutes vos tâches :</p>
      <div className="task-list">
        {tasks.map((task) => (
          <Link to={`/tasks/${task.id}`} key={task.id} className="task-card">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p><strong>Status :</strong> {task.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
