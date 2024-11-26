import Notifyer from "../../config/notify"
class NotifyService {
    async send(email: string, content: string, subject: string): Promise<string> {
        return await Notifyer.send(email, content, subject)
    }
}

export const notifyService = new NotifyService();