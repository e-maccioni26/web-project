import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UserVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const currentPath = location.pathname;

        // Permettre l'accès aux pages sans vérification de token
        if (currentPath === '/register' || currentPath === '/login') {
          return;
        }

        if (token) {
          console.log('Token détecté, en cours de vérification...');
          const response = await axios.get('http://localhost:3000/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            console.log('Token vérifié avec succès.');
          } else {
            console.log('Token invalide, redirection vers /login');
            localStorage.removeItem('token');
            navigate('/login');
          }
        } else {
          console.log('Aucun token trouvé, redirection vers /login');
          // Permettre l'accès à la page de création de compte
          if (currentPath !== '/register') {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error("Erreur de vérification de l'utilisateur:", error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyUser();
  }, [navigate, location]);

  return null;
};

export default UserVerification;
