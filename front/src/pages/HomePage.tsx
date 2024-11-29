import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState<string | null>(null);

  // Fonction pour récupérer les informations de l'utilisateur connecté
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Aucun token trouvé, redirection vers la page de connexion.');
        return;
      }

      const response = await axios.get('http://localhost:3000/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.user && response.data.user.nom) {
        setUserName(response.data.user.nom); // Récupérer le nom de l'utilisateur
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      alert('Impossible de récupérer les informations de l\'utilisateur. Veuillez vous reconnecter.');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/taches');
      setTasks(response.data);
      setFilteredTasks(response.data); 
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUserInfo(); // Récupérer les informations de l'utilisateur à chaque chargement de la page
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
        <Link to="/add-task" className="add-task-button">Ajouter une nouvelle tâche</Link>
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
