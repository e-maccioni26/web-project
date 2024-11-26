import * as crypto from 'crypto';

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
}

export default new SecurityGCM();
