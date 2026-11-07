import 'reflect-metadata';
import { injectable } from 'inversify';
import { IPaymentMethod } from './IPaymentMethod';

@injectable()
export class CreditCardPayment implements IPaymentMethod {
  process(amount: number, details: any): boolean {
    if (!details || !details.cardNumber || !details.cvv) {
      throw new Error('Dados de cartão de crédito inválidos.');
    }
    return true;
  }
}