import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ConfigProjectPage.css';

interface User {
    id: number;
    nom: string;
    email: string;
}

const ConfigProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id || '', 10);
    const [users, setUsers] = useState<User[]>([]);
    const [newUserEmail, setNewUserEmail] = useState<string>('');

    useEffect(() => {
        // Fetch users associated with the project
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };

        fetchUsers();
    }, [projectId]);

    const handleAddUser = async () => {
        try {
            await axios.post(`http://localhost:3000/projects/${projectId}/users`, {
                email: newUserEmail,
            });
            alert('Utilisateur ajouté avec succès');
            setNewUserEmail('');
            // Refresh the users list
            const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            alert('Erreur lors de l\'ajout de l\'utilisateur. Veuillez réessayer.');
        }
    };

    return (
        <div className="config-project-page">
            <h1>Configuration du Projet</h1>
            <p>Projet ID: {projectId}</p>
            <div className="users-list">
                <h2>Utilisateurs du Projet</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.nom} ({user.email})</li>
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
            <Link to={`/projects/${projectId}`} className="back-link">Retour au projet</Link>
        </div>
    );
};

export default ConfigProjectPage;
