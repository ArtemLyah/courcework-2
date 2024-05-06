import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { FisherCreateDTO, FisherUpdateDTO, PaginationDTO } from '@courcework/common';
import { FishersController } from '../controllers/fishers.controller';

const router = express.Router();
const controller = new FishersController();

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
    body: FisherCreateDTO,
  }), 
  controller.create.bind(controller)
);

router.patch(
  '/:id', 
  validateRequest({
    body: FisherUpdateDTO,
  }), 
  controller.update.bind(controller)
);

router.delete(
  '/:id', 
  controller.delete.bind(controller)
);

export { router as fisherRouter };