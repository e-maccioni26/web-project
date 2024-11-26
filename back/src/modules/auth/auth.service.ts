import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwtConfig";
import User from "../../models/User";
import UserAttributes from "../../models/User";

class AuthService {
    generateToken(payload: object): string {
        return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    }
    verifyToken(token: string): Object | null {
        try {
            const decoded = jwt.verify(token, jwtConfig.secret);
            if (typeof decoded === 'object' && decoded !== null) {
                return decoded as Object;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    async checkUserExists(email: string): Promise<UserAttributes | null>{
        try{
            const user = await User.findOne(
                {
                where: {
                    email: email
                }
                }
            )
            const userdata = user?.dataValues as UserAttributes
            if (userdata) {
                return userdata
            }
            return null
        }
        catch{
            return null
        }
    }
    async checkUserCredentials(email: string, mot_de_passe: string): Promise<UserAttributes | null>{
        const user = await User.findOne(
            {
              where: {
                email: email,
                mot_de_passe: mot_de_passe
              }
            }
          )
          const userdata = user?.dataValues as UserAttributes
          if (userdata) {
            return userdata
          }
          return null
    }
    async createUser(
        name: string,
        email: string,
        mot_de_passe: string
    ): Promise<UserAttributes | null>{
        const user = await User.create(
            {
              nom: name,
              email: email,
              mot_de_passe: mot_de_passe,
              date_creation: new Date()
            }
        )
        const userdata = user?.dataValues as UserAttributes
        if (userdata) {
            return userdata
          }
        return null
    }
}

export const authService = new AuthService();