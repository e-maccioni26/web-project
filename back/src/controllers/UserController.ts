import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers(req.query);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(Number(req.query.id));
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.updateUser(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getUserTaches(req: Request, res: Response) {
    try {
      const user = await UserService.getUserTaches(Number(req.query.userId));
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserProjects(req: Request, res: Response) {
    try {
      const user = await UserService.getUserProjects(Number(req.query.userId));
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
