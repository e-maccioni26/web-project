import { Request, Response } from "express";
import { notifyService } from "./notify.service";

export const notifyController = {
  send: async (req: Request, res: Response): Promise<Response> =>{
    const { email, content, subject } = req.body;
    if(typeof(email) !== "string"){
      return res.status(400).json({ error: "type error : email must be a string" });
    }
    if(typeof(content) !== "string"){
      return res.status(400).json({ error: "type error : content must be a string" });
    }
    if(typeof(subject) !== "string"){
      return res.status(400).json({ error: "type error : subject must be a string" });
    }
    const url = await notifyService.send(email, content, subject)
    return  res.json({ "url": url});
  }
};