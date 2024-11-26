import nodemailer from 'nodemailer';

class Notifyer {
    async send(email: string, content: string, subject: string): Promise<string> {
        try {
          const account = await nodemailer.createTestAccount();    
          const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
              user: account.user,
              pass: account.pass,
            },
          });
    
          const message = {
            from: 'Project_EIFI',
            to: email,
            subject: subject,
            text: content,
            html: `<p>${content}</p>`,
          };
    
          const info = await transporter.sendMail(message);

          return nodemailer.getTestMessageUrl(info) || '';
        } catch (err) {
          console.error(`Error while send message : ${err}`);
          throw err;
        }
      }
    
}

export default new Notifyer();