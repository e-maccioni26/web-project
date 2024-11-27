import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);


  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/taches');
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  useEffect(() => {
    fetchTasks();
    // Récupérer l'email de l'utilisateur connecté depuis le localStorage
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  return (
    <div className="home-page">
      <Link to="/add-task" className="add-task-button">Ajouter une nouvelle tâche</Link>
      <h1>Bienvenue {userEmail ? userEmail : "Utilisateur"}</h1>
      <p>Voici la liste de toutes vos tâches :</p>
      <div className="task-list">
        {tasks.map((task) => (
          <Link
            to={`/tasks/${task.id}`}
            key={task.id}
            className="task-card"
          >
            <h2>{task.titre}</h2>
            <p>{task.description}</p>
            <p>
              <strong>Status :</strong> {task.statut}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;