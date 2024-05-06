import express from 'express';
import { FishingPlacesCreateDTO, FishingPlacesUpdateDTO, PaginationDTO } from '@courcework/common';
import { FishingPlacesController } from '../controllers/places.controller';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();
const controller = new FishingPlacesController();

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
    body: FishingPlacesCreateDTO,
  }), 
  controller.create.bind(controller)
);

router.patch(
  '/:id', 
  validateRequest({
    body: FishingPlacesUpdateDTO,
  }), 
  controller.update.bind(controller)
);

router.delete(
  '/:id', 
  controller.delete.bind(controller)
);

export { router as fisheringPlacesRouter };
