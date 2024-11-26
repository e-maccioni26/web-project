import ProjectRepository from '../repositories/ProjectRepository';

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
}

export default new ProjectService();
