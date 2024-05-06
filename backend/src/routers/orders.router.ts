import express from 'express';
import { OrdersCreateDTO, OrdersUpdateDTO, PaginationDTO } from '@courcework/common';
import { OrdersController } from '../controllers/orders.controller';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();
const controller = new OrdersController();

router.get(
  '/', 
  validateRequest({
    query: PaginationDTO,
  }), 
  controller.getAll.bind(controller)
);

router.get(
  '/:id', 
  controller.get.bind(controller)
);

router.post(
  '/', 
  validateRequest({
    body: OrdersCreateDTO,
  }), 
  controller.create.bind(controller)
);

router.patch(
  '/:id', 
  validateRequest({
    body: OrdersUpdateDTO,
  }), 
  controller.update.bind(controller)
);

router.delete(
  '/:id', 
  controller.delete.bind(controller)
);

export { router as ordersRouter };
