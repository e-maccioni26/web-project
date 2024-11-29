import ProjectRepository from '../repositories/ProjectRepository';
import UserProjectRepository from '../repositories/UserProjectRepository';
class ProjectService {
  async createProject(data: any) {
    return await ProjectRepository.createProject(data);
  }

  async getProjects(filters: any) {
    return await ProjectRepository.findAllProjects(filters);
  }

  async getProjectById(id: number) {
    const project = await ProjectRepository.findProjectById(id);
    if (!project) throw new Error('Projet introuvable');
    return project;
  }

  async getProjectUsers(id: number) {
    const users = await UserProjectRepository.getProjectUsers(id);
    if (!users) throw new Error('Projet introuvable');
    return users;
  }

  async updateProject(id: number, data: any) {
    const project = await ProjectRepository.findProjectById(id);
    if (!project) throw new Error('Projet introuvable');
    return await ProjectRepository.updateProject(id, data);
  }

  async deleteProject(id: number) {
    const project = await ProjectRepository.findProjectById(id);
    if (!project) throw new Error('Projet introuvable');
    return await ProjectRepository.deleteProject(id);
  }

  async addUsers(id: number, usersIds: number[]) {
    const project = await ProjectRepository.findProjectById(id);
    if (!project) throw new Error('Projet introuvable');
    const userInProject = await UserProjectRepository.isUserInProject(id, usersIds);
    if(userInProject) throw new Error('Utilisateur déja présent dans le projet');
    return await UserProjectRepository.addUsers(id, usersIds);
  }

  async removeUsers(id: number, usersIds: number[]) {
    const project = await ProjectRepository.findProjectById(id);
    if (!project) throw new Error('Projet introuvable');
    const userInProject = await UserProjectRepository.isUserInProject(id, usersIds);
    if (!userInProject) throw new Error('Utilisateur absent du projet');
    return await UserProjectRepository.removeUsers(id, usersIds);
  }
}

export default new ProjectService();
