import 'reflect-metadata';
import { injectable } from 'inversify';
import { IMailProvider } from './IMailProvider';
import logger from '../lib/logger';

@injectable()
export class ConsoleMailProvider implements IMailProvider {
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    logger.info(`[MODO TESTE - EMAIL NO CONSOLE] Para: ${to} | Assunto: ${subject} | Corpo: ${body}`);
  }
}