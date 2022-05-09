import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../email-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "54509d2b16fabb",
      pass: "efc635b3d1f680"
    }
  });

export class NodenailerMailAdapter implements MailAdapter{

    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe 3Ag <support@3ag.com>',
            to: '3Ag <adm@3ag.com>',
            subject,
            html: body
        });
    }
}   