import { Request, Response } from "express";
import NotifyService from "../services/NotifyService";

class NotifyController{
    async send(req: Request, res: Response){
    const { email, content, subject } = req.body;
    if(typeof(email) !== "string"){
        res.status(400).json({ error: "type error : email must be a string" });
        return
    }
    if(typeof(content) !== "string"){
        res.status(400).json({ error: "type error : content must be a string" });
        return 
    }
    if(typeof(subject) !== "string"){
        res.status(400).json({ error: "type error : subject must be a string" });
        return
    }
    const url = await NotifyService.send(email, content, subject)
    res.json({ "url": url});
  }
};

export default new NotifyController