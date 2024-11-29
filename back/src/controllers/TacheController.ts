import { Request, Response } from 'express';
import TacheService from '../services/TacheService';
import Security from "../config/encrypt"

class TacheController {
  async createTache(req: Request, res: Response) {
    try {
      const tache = await TacheService.createTache(req.body);
      res.status(201).json(tache);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTaches(req: Request, res: Response) {
    try {
      const taches = await TacheService.getTaches(req.query);
      res.status(200).json(taches);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTacheById(req: Request, res: Response) {
    try {
      const tache = await TacheService.getTacheById(Number(req.params.id));
      res.status(200).json(tache);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateTache(req: Request, res: Response) {
    try {
      const updatedTache = await TacheService.updateTache(Number(req.params.id), req.body);
      res.status(200).json(updatedTache);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTache(req: Request, res: Response) {
    try {
      await TacheService.deleteTache(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getTags(req: Request, res: Response) {
    try {
      const tags = await TacheService.getTags(Number(req.params.id));
      res.status(200).send(tags);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async addTags(req: Request, res: Response) {
    const { tags } = req.body
    if (!isIntArray(tags)) {
      res.status(400).json({ error: "tags must be list of integers" });
      return
    }
    try {
      await TacheService.addTags(Number(req.params.id), tags);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeTags(req: Request, res: Response) {
    const { tags } = req.body
    if (!isIntArray(tags)) {
      res.status(400).json({ error: "tags must be list of integers" });
      return
    }
    try {
      await TacheService.removeTags(Number(req.params.id), tags);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await TacheService.getUsers(Number(req.params.id));
      res.status(200).json(users.map(user => Security.encryptUser(user)));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
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
      await TacheService.addUsers(Number(req.params.id), usersIds);
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
      await TacheService.removeUsers(Number(req.params.id), usersIds);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isIntArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

export default new TacheController();
