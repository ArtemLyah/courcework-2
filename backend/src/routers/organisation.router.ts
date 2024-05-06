import express from 'express';
import { OrganisationCreateDTO, OrganisationUpdateDTO, PaginationDTO } from '@courcework/common';
import { OrganisationsController } from '../controllers/organisations.controller';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();
const controller = new OrganisationsController();

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
    body: OrganisationCreateDTO,
  }), 
  controller.create.bind(controller)
);

router.patch(
  '/:id', 
  validateRequest({
    body: OrganisationUpdateDTO,
  }), 
  controller.update.bind(controller)
);

router.delete(
  '/:id', 
  controller.delete.bind(controller)
);

export { router as organisationsRouter };
