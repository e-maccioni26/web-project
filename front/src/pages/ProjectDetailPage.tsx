import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import axios from 'axios';
import '../styles/ProjectDetailPage.css';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '', 10);
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    // Récupérer les informations du projet
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement du projet :', error);
      }
    };

    // Récupérer les tâches du projet depuis l'API
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/taches?project_id=${projectId}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches :', error);
      }
    };

    fetchProject();
    fetchTasks();
  }, [projectId]);

  if (!project) {
    return <p>Projet non trouvé</p>;
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((item) => item.id === parseInt(active.id));
      const newIndex = tasks.findIndex((item) => item.id === parseInt(over.id));
      const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(updatedTasks);
    }

    // Mettre à jour le statut de la tâche
    const activeTask = tasks.find((task) => task.id === parseInt(active.id));
    if (activeTask) {
      try {
        await axios.put(`http://localhost:3000/taches/${activeTask.id}`, {
          ...activeTask,
          statut: over.id,
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
      }
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, statut: newStatus } : task
      )
    );

    // Mettre à jour le statut de la tâche dans la base de données
    try {
      await axios.put(`http://localhost:3000/taches/${taskId}`, {
        statut: newStatus,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  };

  const getTasksByStatus = (status: string) => tasks.filter((task) => task.statut === status);

  return (
    <div key={projectId} className="project-detail-page">
      <button className="config-button" onClick={() => navigate(`/projects/${projectId}/config`)}>
        Configurer le Projet
      </button>
      <h1>Projet {project.nom}</h1>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="task-columns">
          {['à faire', 'en cours', 'terminée'].map((status) => (
            <SortableContext
              items={getTasksByStatus(status).map((task) => task.id.toString())}
              strategy={verticalListSortingStrategy}
              key={status}
            >
              <div
                className="task-column"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const taskId = parseInt(e.dataTransfer.getData('text/plain'));
                  updateTaskStatus(taskId, status);
                }}
              >
                <h3>{status}</h3>
                <hr />
                {getTasksByStatus(status).map((task) => (
                  <div
                    key={task.id}
                    id={task.id.toString()}
                    className="task-item"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id.toString())}
                  >
                    {task.titre}
                  </div>
                ))}
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>
      <Link to="/projects" className="back-link">Retour aux projets</Link>
    </div>
  );
};

export default ProjectDetailPage;
