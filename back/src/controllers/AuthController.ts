import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import Security from "../config/encrypt"

class AuthController {
    async login(req: Request, res: Response) {
        const { email, mot_de_passe } = req.body;
    
        if(typeof(email) !== "string"){
            res.status(400).json({ error: "type error : email must be a string" });
            return
        }
        if(typeof(mot_de_passe) !== "string"){
            res.status(400).json({ error: "type error : mot_de_passe must be a string" });
            return
        }
        const userData = await AuthService.checkUserCredentials(email, mot_de_passe)
        if (!userData) {
            res.status(401).json({ error: "Invalid credentials" });
            return
        }
        const id = userData.id
        const encryptedId = Security.encrypt(id.toString())
    
        const token = AuthService.generateToken({
            nom: userData.nom,
            email,
            id: encryptedId
        });
        res.json({ token });
    }
    async register(req: Request, res: Response) {
        const { nom, email, mot_de_passe } = req.body;
        if(typeof(nom) !== "string"){
          res.status(400).json({ error: "type error : nom must be a string" });
          return
        }
        if(typeof(email) !== "string"){
          res.status(400).json({ error: "type error : email must be a string" });
          return
        }
        if(typeof(mot_de_passe) !== "string"){
          res.status(400).json({ error: "type error : mot_de_passe must be a string" });
          return
        }
        const userExists = await AuthService.checkUserExists(email)
        if (userExists) {
          res.status(400).json({ error: "User already exists" });
          return
        }
        try{
          await AuthService.createUser(nom, email, mot_de_passe)
        }catch(error){
          res.status(500).json({ error: `Error while registring user : ${error}`  });
          return
        }
        const token = AuthService.generateToken({ email });
        res.json({ token });
      }
}

export default new AuthController();
