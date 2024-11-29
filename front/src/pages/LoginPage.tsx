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
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Vérifier la validité du token
      const verifyResponse = await axios.get('http://localhost:3000/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Si la vérification est réussie, rediriger l'utilisateur vers la page d'accueil
      if (verifyResponse.status === 200) {
        navigate('/');
      } else {
        // Si le token est invalide, le supprimer et rediriger vers la page de connexion
        localStorage.removeItem('token');
        alert('Token invalide. Veuillez vous reconnecter.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Erreur de connexion ou de vérification du token:', error);
      alert('Email ou mot de passe incorrect, ou token invalide. Veuillez réessayer.');
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