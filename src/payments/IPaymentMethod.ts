export interface IPaymentMethod {
  process(amount: number, details: any): boolean;
}