import TagService from '../services/TagService';
import { Request, Response } from "express";

class TagController {
    async createTag(req: Request, res: Response) {
        try {
        const tag = await TagService.createTag(req.body);
        res.status(201).json(tag);
        } catch (error: any) {
        res.status(400).json({ error: error.message });
        }
    }
    
    async getTags(req: Request, res: Response) {
        try {
        const tags = await TagService.getTags(req.query);
        res.status(200).json(tags);
        } catch (error: any) {
        res.status(500).json({ error: error.message });
        }
    }
    
    async getTagById(req: Request, res: Response) {
        try {
        const tag = await TagService.getTagById(Number(req.params.id));
        res.status(200).json(tag);
        } catch (error: any) {
        res.status(404).json({ error: error.message });
        }
    }
    
    async updateTag(req: Request, res: Response) {
        try {
        const updatedTag = await TagService.updateTag(Number(req.params.id), req.body);
        res.status(200).json(updatedTag);
        } catch (error: any) {
        res.status(400).json({ error: error.message });
        }
    }
    
    async deleteTag(req: Request, res: Response) {
        try {
        await TagService.deleteTag(Number(req.params.id));
        res.status(204).send();
        } catch (error: any) {
        res.status(404).json({ error: error.message });
        }
    }
}

export default new TagController();