import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwtConfig";
import { User } from "./auth.types";

class AuthService {
    generateToken(payload: object): string {
        return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    }
    verifyToken(token: string): User | null {
        try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        if (typeof decoded === 'object' && decoded !== null) {
            return decoded as User;
        }
            return null;
        } catch (error) {
            return null;
        }
    }
}

export const authService = new AuthService();