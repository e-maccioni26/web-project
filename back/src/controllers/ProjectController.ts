import { Request, Response } from 'express';
import ProjectService from '../services/ProjectService';
import Security from "../config/encrypt"

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

  async addUsers(req: Request, res: Response) {
    const { users } = req.body
    if (!isStringArray(users)) {
      res.status(400).json({ error: "users must be list of string ids" });
      return
    }
    try {
      const usersIds = users.map(user => Security.decryptId(user));
      await ProjectService.addUsers(Number(req.params.id), usersIds);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeUsers(req: Request, res: Response) {
    const { users } = req.body
    if (!isStringArray(users)) {
      res.status(400).json({ error: "users must be list of string ids" });
      return
    }
    try {
      const usersIds = users.map(user => Security.decryptId(user));
      await ProjectService.removeUsers(Number(req.params.id), usersIds);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

export default new ProjectController();
