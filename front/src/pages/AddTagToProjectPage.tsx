import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/AddTaskPage.css';
import axios from 'axios';

const AddTagPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tagTitle, setTagTitle] = useState('');
  const [tagColor, setTagColor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTag = {
      titre: tagTitle,
      color: tagColor,
      project_id: Number(projectId)
    };

    try {
      await axios.post('http://localhost:3000/tags', newTag);
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }
  };

  return (
    <div className="add-task-page">
      <h1>Ajouter une Nouvelle Tâche</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="tagTitle">Titre du tag :</label>
          <input
            type="text"
            id="tagTitle"
            value={tagTitle}
            onChange={(e) => setTagTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <label>Couleur :</label>
          <input
            type="color"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
            required
          />
        </div>
        <button className="btn-submit" type="submit">Ajouter le Tag</button>
      </form>
      <Link to={`/projects/${projectId}`} className="back-link">
          Retour au projet
        </Link>
    </div>
  );
};

export default AddTagPage;