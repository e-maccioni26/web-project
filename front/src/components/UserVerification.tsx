import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserVerification: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
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
          navigate('/login');
        }
      } catch (error) {
        console.error("Erreur de vérification de l'utilisateur:", error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyUser();
  }, [navigate]);

  return null;
};

export default UserVerification;
