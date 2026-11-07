import 'reflect-metadata';
import { injectable } from 'inversify';
import { IOrderRepository } from './IOrderRepository';

@injectable()
export class InMemoryOrderRepository implements IOrderRepository {
  private products = [
    { id: 1, name: 'Livro Físico de Arquitetura', price: 100.0, type: 'physical', weight: 0.5, dimensions: '20x15cm' },
    { id: 2, name: 'E-book de TypeScript', price: 50.0, type: 'digital' }
  ];
  private orders: any[] = [];

  async findProductById(productId: number): Promise<any> {
    return this.products.find(p => p.id === productId) || null;
  }

  async saveOrder(orderData: any): Promise<any> {
    const newOrder = { id: this.orders.length + 1, ...orderData };
    this.orders.push(newOrder);
    return newOrder;
  }
}