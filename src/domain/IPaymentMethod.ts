export interface IPaymentMethod {
  pay(amount: number, details: any): Promise<boolean>;
}