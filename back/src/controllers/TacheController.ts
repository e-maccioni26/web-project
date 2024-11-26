import { Request, Response } from 'express';
import TacheService from '../services/TacheService';

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
}

export default new TacheController();
