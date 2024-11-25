import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProjectDetailPage.css';

const projects = [
  { id: 1, name: 'My Project 1', description: 'Description : Projet 1' },
  { id: 2, name: 'My Project 2', description: 'Description : Projet 2' },
  { id: 3, name: 'My Project 3', description: 'Description : Projet 3' },
];

const tasks = [
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
  const project = projects.find((p) => p.id === parseInt(id || ''));

  if (!project) {
    return <p>Projet non trouvé</p>;
  }

  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const toDoTasks = projectTasks.filter((task) => task.status === 'To do');
  const onProgressTasks = projectTasks.filter((task) => task.status === 'On Progress');
  const doneTasks = projectTasks.filter((task) => task.status === 'Done');

  return (
    <div className="project-detail-page">
      <h1>Bienvenue {'{User}'}</h1>
      <p>Vous avez choisi : {project.name}</p>
      <div className="task-columns">
        <div className="task-column">
          <h3>To do</h3>
          <hr />
          {toDoTasks.map((task) => (
            <p key={task.id}>{task.name}</p>
          ))}
        </div>
        <div className="task-column">
          <h3>On Progress</h3>
          <hr />
          {onProgressTasks.map((task) => (
            <p key={task.id}>{task.name}</p>
          ))}
        </div>
        <div className="task-column">
          <h3>Done</h3>
          <hr />
          {doneTasks.map((task) => (
            <p key={task.id}>{task.name}</p>
          ))}
        </div>
      </div>
      <Link to="/projects" className="back-link">Retour aux projets</Link>
    </div>
  );
};

export default ProjectDetailPage;
