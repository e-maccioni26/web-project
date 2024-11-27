import * as crypto from 'crypto';
import { UserAttributesEncoded } from '../utils/types';

function splitEncryptedText(encryptedText: string) {
    return {
        ivString: encryptedText.slice(0, 32),
        authTagString: encryptedText.slice(32, 64),
        encryptedDataString: encryptedText.slice(64),
    };
}

class SecurityGCM {
    encoding: BufferEncoding = 'hex';

    key: Buffer = Buffer.from(process.env.CRYPTO_KEY as '', 'base64');
    salt: string = process.env.SALT as ''

    encrypt(plaintext: string) {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);

            const encrypted = Buffer.concat([
                cipher.update(plaintext + this.salt, 'utf-8'),
                cipher.final(),
            ]);

            const authTag = cipher.getAuthTag();

            return (
                iv.toString(this.encoding) +
                authTag.toString(this.encoding) +
                encrypted.toString(this.encoding)
            );
        } catch (e) {
            console.error('Encryption failed:', e);
        }
    }

    decrypt(cipherText: string) {
        const { encryptedDataString, ivString, authTagString } =
            splitEncryptedText(cipherText);

        try {
            const iv = Buffer.from(ivString, this.encoding);
            const authTag = Buffer.from(authTagString, this.encoding);
            const encryptedText = Buffer.from(encryptedDataString, this.encoding);

            const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, iv);
            decipher.setAuthTag(authTag);

            const decrypted = decipher.update(encryptedText);
            const decryptedString =  Buffer.concat([decrypted, decipher.final()]).toString();
            return decryptedString.substring(0, decryptedString.length - this.salt.length);
        } catch (e) {
            console.error('Decryption failed:', e);
        }
    }
    decryptId(encrypted: string): number{
        const decrypted = this.decrypt(encrypted)
        if(typeof(decrypted) == "string"){
            return parseInt(decrypted)
        }else{
            throw new Error("invalid ID");
        }
    }
    encryptUser(user: any): UserAttributesEncoded{
        const encryptedId = this.encrypt(user.id.toString())
        if (typeof(encryptedId) !== "string") throw new Error("invalid ID");
        try{
            return {
                id: encryptedId,
                nom: user.nom,
                email: user.email,
                mot_de_passe: user.mot_de_passe,
                date_creation: user.date_creation,
            };
        }
        catch{
            throw new Error("Error while encrypting ID")
        }
    }
}

export default new SecurityGCM();
