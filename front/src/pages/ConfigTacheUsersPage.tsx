import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ConfigProjectPage.css';

interface User {
    id: string;
    nom: string;
    email: string;
    mot_de_passe: string;
}

interface Task {
    id: number;
    titre: string;
    description: string;
    statut: string;
    priorite: string;
    date_creation: string;
    date_echeance: string;
  }

const ConfigTacheUsersPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { projectId } = useParams<{ projectId: string }>();
    const Idproject = projectId
    const [tacheName, setTacheName] = useState<string>('');
    const [tacheUsers, setTacheUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [newUserEmail, setNewUserEmail] = useState<string>('');
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchTacheDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/taches/${id}`);
                const tache: Task = response.data;
                setTacheName(tache.titre);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du projet:', error);
            }
        };

        // Fetch users associated with the project
        const fetchTacheUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/taches/${id}/users`);
                const users = response.data.filter((user: any) => user && user.nom && user.email && user.mot_de_passe);
                setTacheUsers(users);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs du projet:', error);
            }
        };

        // Fetch all users
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
                setAllUsers(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de tous les utilisateurs:', error);
            }
        };

        fetchTacheDetails();
        fetchTacheUsers();
        fetchAllUsers();
    }, [id]);

    const handleAddUser = async (usersIds: string[]) => {


        try {
            await axios.post(`http://localhost:3000/taches/${id}/users`, {
                users: usersIds,
            });

            alert('Utilisateur ajouté avec succès');

            const response = await axios.get(`http://localhost:3000/taches/${id}/users`);
            const users = response.data.filter((user: any) => user && user.nom && user.email && user.mot_de_passe);
            setTacheUsers(users);

            setNewUserEmail('');
            setSelectedUserIds([])
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error);
            alert("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
        }
    };

    const handleRemoveUser = async (userId: string) => {
        try {
            const userToRemove = tacheUsers.find(user => user.id === userId);
            if (!userToRemove) {
                alert("Utilisateur non trouvé parmi les utilisateurs du projet. Veuillez vérifier l'utilisateur.");
                return;
            }

            await axios.delete(`http://localhost:3000/taches/${id}/users`, {
                data: {
                    users: [userToRemove.id.toString()],
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Utilisateur supprimé avec succès');

            // Rafraîchir la liste des utilisateurs du projet
            const response = await axios.get(`http://localhost:3000/taches/${id}/users`);
            const users = response.data.filter((user: any) => user && user.nom && user.email && user.mot_de_passe);
            setTacheUsers(users);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            alert("Erreur lors de la suppression de l'utilisateur. Veuillez réessayer.");
        }
    };

    const handleCheckboxChange = (userId: string) => {
        setSelectedUserIds(prevState => {
            if (prevState.includes(userId)) {
                return prevState.filter(id => id !== userId);
            }
            return [...prevState, userId];
        });
    };

    const filteredUsers = allUsers
        .filter(user => user.email.toLowerCase().includes(newUserEmail.toLowerCase()))
        .filter(user => !tacheUsers.some(tacheUser => tacheUser.email === user.email && tacheUser.mot_de_passe === user.mot_de_passe));


    return (
        <div className="config-project-page">
            <h1>Affectation d'un utilisateur à : {tacheName}</h1>
            <div className="users-list">
                <h2>Utilisateurs affectés à la tâche</h2>
                <div className="project-users">
                    {tacheUsers.map((user) => (
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
                <h3>Affecter un utilisateur à la tâche</h3>
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
                            const alreadyAdded = tacheUsers.some((tacheUser) => {
                                return tacheUser.email === user.email && tacheUser.mot_de_passe === user.mot_de_passe;
                            });

                            return (
                                <div key={user.id} className="user-card">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(user.id)}
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
            <div>
            <button 
                onClick={() => handleAddUser(selectedUserIds)}
                disabled={selectedUserIds.length === 0}
            >
                Ajouter
            </button>
            </div>
            <Link to={`/tasks/${id}/${Idproject}`} className="back-link">Retour à la tâche</Link>
        </div>
    );
};

export default ConfigTacheUsersPage;
