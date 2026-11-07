import 'reflect-metadata';
import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import { IMailProvider } from './IMailProvider';
import logger from '../lib/logger';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private transporter: any;

  constructor() {
    this.initTransporter();
  }

  private async initTransporter() {
    const testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    if (!this.transporter) {
      await this.initTransporter();
    }

    const info = await this.transporter.sendMail({
      from: '"E-commerce" <no-reply@ecommerce.com>',
      to,
      subject,
      text: body,
    });

    logger.info(`Email enviado: ${nodemailer.getTestMessageUrl(info)}`);
  }
}