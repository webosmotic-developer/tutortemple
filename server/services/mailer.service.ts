import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as dotenv from 'dotenv';

dotenv.load({path: '.env'});

export default class MailerService {

    /**
     * Send email notification using gmail account
     * @param {any} options
     * */
    fnSendEmail = (options: any) => {
        options.from = '"Tutor Temple" <no-reply@tutortemple.com>';
        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        }));
        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (error, info) => {
                if (error) {
                    console.error('MailerService:fnSendEmail() => transporter.sendMail()', error);
                    reject(error);
                } else {
                    console.error('MailerService:fnSendEmail() => transporter.sendMail() => Email sent', info.response);
                    resolve(info);
                }
            });
        });
    };
}

