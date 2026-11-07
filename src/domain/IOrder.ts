export interface IOrderDto {
  customer: string;
  items: Array<{ productId: number; quantity: number }>;
  paymentMethod: string;
  paymentDetails: any;
}

export interface IOrderRepository {
  save(order: IOrderDto): Promise<any>;
}