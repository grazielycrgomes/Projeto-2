import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '../container/types';
import { IMailProvider } from '../providers/IMailProvider';

@injectable()
export class NotificationService {
  constructor(
    @inject(TYPES.MailProvider) private mailProvider: IMailProvider
  ) {}

  async notifyCustomer(customerEmail: string, orderId: number, total: number): Promise<void> {
    const subject = `Confirmação do Pedido #${orderId}`;
    const body = `Olá! Seu pedido #${orderId} foi processado com sucesso. Valor total: R$ ${total.toFixed(2)}`;
    
    await this.mailProvider.sendMail(customerEmail, subject, body);
  }
}