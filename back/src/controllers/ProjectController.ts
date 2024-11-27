import { Request, Response } from 'express';
import ProjectService from '../services/ProjectService';

class ProjectController {
  async createProject(req: Request, res: Response) {
    try {
      const project = await ProjectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProjects(req: Request, res: Response) {
    try {
      const projects = await ProjectService.getProjects(req.query);
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectById(req: Request, res: Response) {
    try {
      const project = await ProjectService.getProjectById(Number(req.params.id));
      res.status(200).json(project);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getProjectUsers(req: Request, res: Response) {
    try {
      const project = await ProjectService.getProjectUsers(Number(req.params.id));
      res.status(200).json(project);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const updatedProject = await ProjectService.updateProject(Number(req.params.id), req.body);
      res.status(200).json(updatedProject);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      await ProjectService.deleteProject(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new ProjectController();
