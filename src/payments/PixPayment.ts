import 'reflect-metadata';
import { injectable } from 'inversify';
import { IPaymentMethod } from './IPaymentMethod';

@injectable()
export class PixPayment implements IPaymentMethod {
  process(amount: number, details: any): boolean {
    return true;
  }
}