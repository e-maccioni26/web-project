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
import '../styles/ProjectDetailPage.css';

const projects = [
  { id: 1, name: 'My Project 1', description: 'Description : Projet 1' },
  { id: 2, name: 'My Project 2', description: 'Description : Projet 2' },
  { id: 3, name: 'My Project 3', description: 'Description : Projet 3' },
];

const tasksData = [
  { id: 1, projectId: 1, status: 'To do', name: 'Task 1: To do' },
  { id: 2, projectId: 1, status: 'To do', name: 'Task 2: To do' },
  { id: 3, projectId: 1, status: 'On Progress', name: 'Task 3: On Progress' },
  { id: 4, projectId: 1, status: 'On Progress', name: 'Task 4: On Progress' },
  { id: 5, projectId: 1, status: 'Done', name: 'Task 5: Done' },
  { id: 6, projectId: 2, status: 'To do', name: 'Task 6: To do' },
  { id: 7, projectId: 2, status: 'Done', name: 'Task 7: Done' },
];

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '', 10);
  const project = projects.find((p) => p.id === projectId);
  const [tasks, setTasks] = useState(tasksData.filter((task) => task.projectId === projectId));
  const navigate = useNavigate();

  useEffect(() => {
    // Mettre à jour les tâches lorsque l'ID du projet change
    setTasks(tasksData.filter((task) => task.projectId === projectId));
  }, [projectId]);

  if (!project) {
    return <p>Projet non trouvé</p>;
  }

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === parseInt(active.id));
        const newIndex = items.findIndex((item) => item.id === parseInt(over.id));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getTasksByStatus = (status: string) => tasks.filter((task) => task.status === status);

  return (
    <div key={projectId} className="project-detail-page">
      <button className="config-button" onClick={() => navigate(`/projects/${projectId}/config`)}>
        Configurer le Projet
      </button>
      <h1>Bienvenue {'{User}'}</h1>
      <p>Vous avez choisi : {project.name}</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="task-columns">
          {['To do', 'On Progress', 'Done'].map((status) => (
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
                    {task.name}
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
