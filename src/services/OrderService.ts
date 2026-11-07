import 'reflect-metadata';
import { injectable, inject, multiInject } from 'inversify';
import { TYPES } from '../container/types';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { ProductFactory } from '../domain/ProductFactory';
import { IPaymentMethod } from '../payments/IPaymentMethod';
import { NotificationService } from './NotificationService';
import logger from '../lib/logger';

@injectable()
export class OrderService {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository,
    @multiInject(TYPES.PaymentMethod) private paymentMethods: IPaymentMethod[],
    @inject(NotificationService) private notificationService: NotificationService
  ) {}

  async execute(data: any) {
    let subtotal = 0;
    let totalFreight = 0;
    const processedItems = [];

    for (const item of data.items) {
      const productData = await this.orderRepository.findProductById(item.productId);
      if (!productData) {
        throw new Error(`Produto com ID ${item.productId} não encontrado.`);
      }

      const product = ProductFactory.createProduct(productData);
      subtotal += product.getPrice() * item.quantity;
      totalFreight += product.calculateFreight() * item.quantity;

      processedItems.push({
        productId: product.getId(),
        quantity: item.quantity,
        price: product.getPrice()
      });
    }

    const totalAmount = subtotal + totalFreight;

    let pagamentoEscolhido = null;
    for (const m of this.paymentMethods) {
      if (data.paymentMethod === 'credit_card' && m.constructor.name.includes('CreditCard')) {
        pagamentoEscolhido = m;
      }
      if (data.paymentMethod === 'pix' && m.constructor.name.includes('Pix')) {
        pagamentoEscolhido = m;
      }
    }

    if (!pagamentoEscolhido) {
      throw new Error('Método de pagamento não suportado.');
    }

    const paymentSuccess = pagamentoEscolhido.process(totalAmount, data.paymentDetails);
    if (!paymentSuccess) {
      throw new Error('Falha no processamento do pagamento.');
    }

    const savedOrder = await this.orderRepository.saveOrder({
      customer: data.customer,
      total: totalAmount,
      items: { create: processedItems }
    });

    logger.info(`Pedido criado com sucesso ID: ${savedOrder.id}`);
    await this.notificationService.notifyCustomer(data.customer, savedOrder.id, totalAmount);

    return savedOrder;
  }
}