import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { container } from './container/container';
import { OrderController } from './controllers/OrderController';

dotenv.config();

const app = express();
app.use(express.json());

// Pega o controller direto do container do Inversify
const orderController = container.get(OrderController);

app.post('/orders', (req, res) => orderController.handle(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});