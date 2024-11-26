import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [myTasks, setMyTasks] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/users/taches/?userId=1') // mettre le bon id user
      .then((response) => {
        setMyTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home-page">
      <h1>Bienvenue {"{User}"}</h1>
      <p>Voici la liste de toutes vos tâches :</p>
      <div className="task-list">
        {myTasks.map((task) => (
          <Link
            to={`/tasks/${task.Tache.id}`}
            key={task.Tache.id}
            className="task-card"
          >
            <h2>{task.Tache.titre}</h2>
            <p>{task.Tache.description}</p>
            <p>
              <strong>Status :</strong> {task.Tache.statut}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
