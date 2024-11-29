import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ConfigProjectPage.css';

interface Tag {
    id: number;
    titre: string;
    color: string;
    projectId: number;
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

const ConfigTacheTagsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const tacheId = parseInt(id || '', 10);
    const { projectId } = useParams<{ projectId: string }>();
    const Idproject = parseInt(projectId || '', 10);
    const [tacheName, setTacheName] = useState<string>('');
    const [tacheTags, setTacheTags] = useState<Tag[]>([]);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [newTagTitle, setNewTagTitle] = useState<string>('');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchTacheDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/taches/${tacheId}`);
                const tache: Task = response.data;
                setTacheName(tache.titre);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la tâche:', error);
            }
        };

        // Fetch tags associated with the project
        const fetchTacheTags = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/taches/${tacheId}/tags`);
                const tags = response.data.filter((tag: any) => tag.id && tag.titre && tag.color);
                setTacheTags(tags);
            } catch (error) {
                console.error('Erreur lors de la récupération des tags de la tâche:', error);
            }
        };

        // Fetch all tags
        const fetchAllTags = async () => {
            try {
                const response = await axios.get('http://localhost:3000/tags/', {
                    params: { project_id: Idproject },
                });
                const tags = response.data.filter((tag: any) => tag.id && tag.titre && tag.color);
                console.log(tags)
                setAllTags(tags);
            } catch (error) {
                console.error('Erreur lors de la récupération de tous les tags:', error);
            }
        };

        fetchTacheDetails();
        fetchTacheTags();
        fetchAllTags();
    }, [tacheId]);

    const handleAddTag = async (tagsIds: number[]) => {


        try {
            await axios.post(`http://localhost:3000/taches/${tacheId}/tags`, {
                tags: tagsIds,
            });

            const response = await axios.get(`http://localhost:3000/taches/${id}/tags`);
            const tags = response.data.filter((tag: any) => tag.id && tag.titre && tag.color);
            setTacheTags(tags);

            setNewTagTitle('');
            setSelectedTagIds([]);
        } catch (error) {
            console.error("Erreur lors de l'ajout des tags:", error);
            alert("Erreur lors de l'ajout des tags. Veuillez réessayer.");
        }
    };

    const handleRemoveTag = async (tagId: number) => {
        try {
            const tagToRemove = tacheTags.find(tag => tag.id === tagId);
            if (!tagToRemove) {
                alert("Tag non trouvé parmi les tags de la tache. Veuillez vérifier le tag.");
                return;
            }

            await axios.delete(`http://localhost:3000/taches/${tacheId}/tags`, {
                data: {
                    tags: [tagToRemove.id],
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const response = await axios.get(`http://localhost:3000/taches/${tacheId}/tags`);
            const tags = response.data.filter((tag: any) => tag.id && tag.titre && tag.color);
            setTacheTags(tags);
        } catch (error) {
            console.error("Erreur lors de la suppression du tag:", error);
            alert("Erreur lors de la suppression du tag. Veuillez réessayer.");
        }
    };

    const handleCheckboxChange = (tagId: number) => {
        setSelectedTagIds(prevState => {
            if (prevState.includes(tagId)) {
                return prevState.filter(id => id !== tagId);
            }
            return [...prevState, tagId];
        });
    };

    const filteredTags = allTags
        .filter(tag => tag.titre.toLowerCase().includes(newTagTitle.toLowerCase()))
        .filter(tag => !tacheTags.some(tacheTag => tacheTag.titre === tag.titre));


    return (
        <div className="config-project-page">
            <h1>Affectation d'un tag à : {tacheName}</h1>
            <div className="users-list">
                <h2>Utilisateurs affectés à la tâche</h2>
                <div className="project-users">
                    {tacheTags.map((tag) => (
                        <div key={tag.id} className="user-card">
                            <div className="tag-info" style={{ backgroundColor: tag.color }}>
                                <p>{tag.titre ? tag.titre : 'Titre non disponible'}</p>
                            </div>
                            <button
                                className="remove-user-button"
                                onClick={() => handleRemoveTag(tag.id)}
                                style={{ color: 'red' }}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="add-user">
                <h3>Affecter un tag à la tâche</h3>
                <div className='add-user-container'>
                    <input
                        type="text"
                        value={newTagTitle}
                        className='add-user-input'
                        onChange={(e) => setNewTagTitle(e.target.value)}
                        placeholder="Titre"
                    />
                </div>
                {(
                    <div className="filtered-users">
                        {filteredTags.map((tag) => {
                            const alreadyAdded = tacheTags.some((tacheTag) => {
                                return tacheTag.id === tag.id;
                            });

                            return (
                                <div key={tag.id} className="user-card" >
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(tag.id)}
                                    />
                                    <div className="tag-info" style={{ backgroundColor: tag.color }}>
                                        <p>{tag.titre ? tag.titre : 'Titre non disponible'}</p>
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
                onClick={() => handleAddTag(selectedTagIds)}
                disabled={selectedTagIds.length === 0}
            >
                Ajouter
            </button>
            </div>
            <Link to={`/tasks/${tacheId}/${Idproject}`} className="back-link">Retour à la tâche</Link>
        </div>
    );
};

export default ConfigTacheTagsPage;
