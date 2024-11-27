import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ConfigProjectPage.css';

interface User {
    id: string;
    nom: string;
    email: string;
}

const ConfigProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id || '', 10);
    const [projectUsers, setProjectUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [newUserEmail, setNewUserEmail] = useState<string>('');

    useEffect(() => {
        // Fetch users associated with the project
        const fetchProjectUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
                const users = response.data.map((item: any) => item.User);
                setProjectUsers(users);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs du projet:', error);
            }
        };

        // Fetch all users
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setAllUsers(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de tous les utilisateurs:', error);
            }
        };

        fetchProjectUsers();
        fetchAllUsers();
    }, [projectId]);

    const handleAddUser = async () => {
        try {
            // Rechercher l'utilisateur par email dans la liste des utilisateurs
            const userToAdd = allUsers.find(user => user.email === newUserEmail);
            if (!userToAdd) {
                alert("Utilisateur non trouvé. Veuillez vérifier l'email.");
                return;
            }

            // Vérifier si l'utilisateur est déjà présent dans les utilisateurs du projet
            if (projectUsers.some((user) => user.id === userToAdd.id)) {
                alert('Cet utilisateur est déjà associé au projet.');
                return;
            }

            // Vérifier le token et récupérer l'ID chiffré de l'utilisateur via le token
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Token non trouvé, veuillez vous reconnecter.');
                return;
            }

            const responseVerify = await axios.get('http://localhost:3000/auth/verify', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            const verifiedUserId = responseVerify.data.user.id;

            // Envoyer l'ID chiffré de l'utilisateur trouvé au backend pour l'ajouter au projet
            await axios.post(`http://localhost:3000/projects/${projectId}/users`, {
                users: [verifiedUserId],
            });

            alert('Utilisateur ajouté avec succès');
            setNewUserEmail('');

            // Rafraîchir la liste des utilisateurs du projet
            const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
            const users = response.data.map((item: any) => item.User);
            setProjectUsers(users);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error);
            alert("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
        }
    };

    const handleRemoveUser = async (userId: string) => {
        try {
            // Vérifier le token et récupérer l'ID chiffré de l'utilisateur via le token
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Token non trouvé, veuillez vous reconnecter.');
                return;
            }

            const responseVerify = await axios.get('http://localhost:3000/auth/verify', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            const verifiedUserId = responseVerify.data.user.id;

            // Assurez-vous que l'ID est bien une chaîne de caractères
            await axios.delete(`http://localhost:3000/projects/${projectId}/users`, {
                data: {
                    users: [verifiedUserId], // Envoyer l'ID chiffré de l'utilisateur
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Utilisateur supprimé avec succès');

            // Rafraîchir la liste des utilisateurs du projet
            const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
            const users = response.data.map((item: any) => item.User);
            setProjectUsers(users);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            alert("Erreur lors de la suppression de l'utilisateur. Veuillez réessayer.");
        }
    };

    return (
        <div className="config-project-page">
            <h1>Configuration du Projet</h1>
            <p>Projet ID: {projectId}</p>
            <div className="users-list">
                <h2>Utilisateurs du Projet</h2>
                <ul>
                    {projectUsers.map((user) => (
                        <li key={user.id}>
                            {user.nom ? user.nom : 'Nom non disponible'} ({user.email ? user.email : 'Email non disponible'})
                            <button
                                className="remove-user-button"
                                onClick={() => handleRemoveUser(user.id)}
                                style={{ color: 'red', marginLeft: '10px' }}
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="add-user">
                <h3>Ajouter un utilisateur au projet</h3>
                <div className='add-user-container'>
                    <input
                        type="email"
                        value={newUserEmail}
                        className='add-user-input'
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="Email de l'utilisateur"
                    />
                    <button onClick={handleAddUser} className='add-user-button'>Ajouter</button>
                </div>
            </div>
            <div className="all-users-list">
                <h2>Tous les Utilisateurs</h2>
                <ul>
                    {allUsers.map((user) => (
                        <li key={user.id}>{user.email ? user.email : 'Email non disponible'}</li>
                    ))}
                </ul>
            </div>
            <Link to={`/projects/${projectId}`} className="back-link">Retour au projet</Link>
        </div>
    );
};

export default ConfigProjectPage;
