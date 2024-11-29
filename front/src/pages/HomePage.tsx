import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');


  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}/taches`);
      setTasks(response.data);
      setFilteredTasks(response.data); 
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const results = tasks.filter(task =>
      task.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchTerm, tasks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="home-page">
      <h1>Bienvenue <span className='user'>{userName ? userName : "Utilisateur"}</span></h1>
      <div className='div'>
        {/* <Link to="/add-task" className="add-task-button">Ajouter une nouvelle tâche</Link> */}
        <div>
          <label>Faire une recherche :</label>
          <input
            type="text"
            placeholder="Rechercher des tâches..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </div>
      <p>Voici la liste de toutes vos tâches :</p>
      <div className="task-list">
        {filteredTasks.map((task) => (
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
