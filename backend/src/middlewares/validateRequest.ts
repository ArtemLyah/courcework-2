import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from "express";
import { RequestBodyException, ValidationException } from '@courcework/common';

interface ValidationData {
  body?: new () => any;
  query?: new () => any;
  params?: new () => any;
}

export const validateRequest = (data: ValidationData) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const [field, class_] of Object.entries(data)) {
      if (!req[field]) {
        throw new RequestBodyException(field);
      }

      const instance = plainToInstance(class_, req[field]);
      const errors = await validate(instance);

      req[field] = instance;

      if (errors.length) {
        throw new ValidationException(errors, field);
      }
    }

    next();
  }
};