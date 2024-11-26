import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envoyer la requête de connexion vers le backend
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        mot_de_passe: password,
      });

      // Stocker le token JWT dans le localStorage
      localStorage.setItem('token', response.data.token);

      // Rediriger l'utilisateur vers la page d'accueil
      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Se connecter</button>
      </form>
      <p>Vous n'avez pas de compte ? <a href="/register">Créez un compte ici</a></p>
    </div>
  );
};

export default LoginPage;