import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ConfigProjectPage.css';

interface User {
    id: string;
    nom: string;
    email: string;
    mot_de_passe: string; // Ajout du champ mot_de_passe
}

interface Project {
    nom: string;
}

const ConfigProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id || '', 10);
    const [projectName, setProjectName] = useState<string>('');
    const [projectUsers, setProjectUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [newUserEmail, setNewUserEmail] = useState<string>('');

    useEffect(() => {
        // Fetch project details
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/projects/${projectId}`);
                const project: Project = response.data;
                setProjectName(project.nom);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du projet:', error);
            }
        };

        // Fetch users associated with the project
        const fetchProjectUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
                const users = response.data.filter((user: any) => user && user.nom && user.email && user.mot_de_passe);
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

        fetchProjectDetails();
        fetchProjectUsers();
        fetchAllUsers();
    }, [projectId]);

    const handleAddUser = async (userToAdd: User) => {

        const alreadyAdded = projectUsers.some((user) => {
            return user.email === userToAdd.email && user.mot_de_passe === userToAdd.mot_de_passe;
        });

        if (alreadyAdded) {
            alert('Cet utilisateur est déjà associé au projet.');
            return;
        }

        try {
            await axios.post(`http://localhost:3000/projects/${projectId}/users`, {
                users: [userToAdd.id.toString()],
            });

            alert('Utilisateur ajouté avec succès');

            // Rafraîchir la liste des utilisateurs du projet sans recharger la page entière
            const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
            const users = response.data.filter((user: any) => user && user.nom && user.email && user.mot_de_passe);
            setProjectUsers(users);

            // Nettoyer la barre de recherche
            setNewUserEmail('');
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error);
            alert("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
        }
    };

    const handleRemoveUser = async (userId: string) => {
        try {
            const userToRemove = projectUsers.find(user => user.id === userId);
            if (!userToRemove) {
                alert("Utilisateur non trouvé parmi les utilisateurs du projet. Veuillez vérifier l'utilisateur.");
                return;
            }

            await axios.delete(`http://localhost:3000/projects/${projectId}/users`, {
                data: {
                    users: [userToRemove.id.toString()],
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Utilisateur supprimé avec succès');

            // Rafraîchir la liste des utilisateurs du projet
            const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
            const users = response.data.filter((user: any) => user && user.nom && user.email && user.mot_de_passe);
            setProjectUsers(users);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            alert("Erreur lors de la suppression de l'utilisateur. Veuillez réessayer.");
        }
    };

    const filteredUsers = allUsers.filter(user => user.email.toLowerCase().includes(newUserEmail.toLowerCase()));

    return (
        <div className="config-project-page">
            <h1>Configuration du Projet {projectName}</h1>
            <div className="users-list">
                <h2>Utilisateurs affectés au Projet</h2>
                <div className="project-users">
                    {projectUsers.map((user) => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <p>{user.nom ? user.nom : 'Nom non disponible'}</p>
                                <p>{user.email ? user.email : 'Email non disponible'}</p>
                            </div>
                            <button
                                className="remove-user-button"
                                onClick={() => handleRemoveUser(user.id)}
                                style={{ color: 'red' }}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="add-user">
                <h3>Ajouter un utilisateur au projet</h3>
                <div className='add-user-container'>
                    <input
                        type="text"
                        value={newUserEmail}
                        className='add-user-input'
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="Email de l'utilisateur"
                    />
                </div>
                {newUserEmail && (
                    <div className="filtered-users">
                        {filteredUsers.map((user) => {
                            // Vérifier si l'utilisateur est déjà associé au projet par email et mot de passe
                            const alreadyAdded = projectUsers.some((projectUser) => {
                                return projectUser.email === user.email && projectUser.mot_de_passe === user.mot_de_passe;
                            });

                            return (
                                <div key={user.id} className="user-card">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleAddUser(user)}
                                        disabled={alreadyAdded} // Désactiver la case à cocher si l'utilisateur est déjà ajouté
                                    />
                                    <div className="user-info">
                                        <p>{user.nom ? user.nom : 'Nom non disponible'}</p>
                                        <p>{user.email ? user.email : 'Email non disponible'}</p>
                                    </div>
                                    {alreadyAdded && (
                                        <span style={{ color: 'red', marginLeft: '10px' }}>
                                            Déjà ajouté
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Link to={`/projects/${projectId}`} className="back-link">Retour au projet</Link>
        </div>
    );
};

export default ConfigProjectPage;
