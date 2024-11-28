import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [nom, setNom] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Vérifier si l'email est déjà utilisé
      const existingUserResponse = await axios.get(`http://localhost:3000/users?email=${email}`);
      if (existingUserResponse.data.length > 0) {
        alert('Un compte avec cet email existe déjà. Veuillez vous connecter.');
        return;
      }
      // Envoyer la requête d'inscription vers le backend
      const response = await axios.post('http://localhost:3000/auth/register', {
        nom,
        email,
        mot_de_passe: password,
      });

      // Stocker le token JWT dans le localStorage
      localStorage.setItem('token', response.data.token);

      // Rediriger vers la page d'accueil après une inscription réussie
      alert('Inscription réussie, vous êtes maintenant connecté.');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      alert('Erreur lors de la création du compte. Veuillez réessayer.');
    }
  };

  return (
    <div className="register-page">
      <h1>Créer un Compte</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p>Vous avez déjà un compte ? <a href="/login">Connectez-vous ici</a></p>
    </div>
  );
};

export default RegisterPage;
