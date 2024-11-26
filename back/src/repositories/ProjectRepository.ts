import Project from '../models/Project';

class ProjectRepository {
  async createProject(data: any) {
    return await Project.create(data);
  }

  async findAllProjects(filters: any = {}) {
    return await Project.findAll({ where: filters });
  }

  async findProjectById(id: number) {
    return await Project.findByPk(id);
  }

  async updateProject(id: number, data: any) {
    return await Project.update(data, { where: { id } });
  }

  async deleteProject(id: number) {
    return await Project.destroy({ where: { id } });
  }
}

export default new ProjectRepository();
