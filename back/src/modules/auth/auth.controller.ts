import { Request, Response } from "express";
import { authService } from "./auth.service";
export const authController = {
  login: async (req: Request, res: Response): Promise<Response> => {
    const { email, mot_de_passe } = req.body;
    console.log(typeof(email))
    if(typeof(email) !== "string"){
      return res.status(400).json({ error: "type error : email must be a string" });
    }
    if(typeof(mot_de_passe) !== "string"){
      return res.status(400).json({ error: "type error : mot_de_passe must be a string" });
    }
    const userData = await authService.checkUserCredentials(email, mot_de_passe)
    if (!userData) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = authService.generateToken({ email });
    return res.json({ token });
  },
  register: async (req: Request, res: Response): Promise<Response> => {
    const { nom, email, mot_de_passe } = req.body;
    if(typeof(nom) !== "string"){
      return res.status(400).json({ error: "type error : nom must be a string" });
    }
    if(typeof(email) !== "string"){
      return res.status(400).json({ error: "type error : email must be a string" });
    }
    if(typeof(mot_de_passe) !== "string"){
      return res.status(400).json({ error: "type error : mot_de_passe must be a string" });
    }
    const userExists = await authService.checkUserExists(email)
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    try{
      await authService.createUser(nom, email, mot_de_passe)
    }catch(error){
      return res.status(500).json({ error: `Error while registring user : ${error}`  });
    }
    const token = authService.generateToken({ email });
    return res.json({ token });
  }
};