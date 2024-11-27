import { Request, Response } from "express";
import UserService from "../services/UserService";
import Security from "../config/encrypt"

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
      res.status(200).json(users.map(user => Security.encryptUser(user)) );
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      if (typeof(req.params.id) !== "string"){
        res.status(400).json({ error: "id must be a string" });
        return
      }
      const decryptedId = Security.decryptId(req.params.id)
      const user = await UserService.getUserById(decryptedId);
      res.status(200).json(Security.encryptUser(user));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      console.log(req.params.id)
      if (typeof(req.params.id) !== "string"){
        res.status(400).json({ error: "id must be a string" });
        return
      }
      const decryptedId = Security.decryptId(req.params.id)
      const updatedUser = await UserService.updateUser(
        decryptedId,
        req.body
      );
      res.status(200).json(Security.encryptUser(updatedUser!));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    if (typeof(req.params.id) !== "string"){
      res.status(400).json({ error: "id must be a string" });
      return
    }
    const decryptedId = Security.decryptId(req.params.id)
    try {
      await UserService.deleteUser(decryptedId);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getUserTaches(req: Request, res: Response) {
    try {
      const decryptedId = Security.decryptId(req.params.id)
      const user = await UserService.getUserTaches(decryptedId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserProjects(req: Request, res: Response) {
    try {
      const decryptedId = Security.decryptId(req.params.id)
      const user = await UserService.getUserProjects(decryptedId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
