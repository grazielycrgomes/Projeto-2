export interface IOrderRepository {
  findProductById(productId: number): Promise<any>;
  saveOrder(orderData: any): Promise<any>;
}