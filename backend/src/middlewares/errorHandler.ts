import { Exception } from "@courcework/common";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: Exception | Error, req: Request, res: Response, next: NextFunction) => {
  let errorResponse;

  if (error instanceof Exception) {
    errorResponse = error.serialize();
  }
  else {
    console.error(error);
    errorResponse = {
      statusCode: 500,
      error: error.name,
      message: error.message,
    };
  }

  res.status(errorResponse.statusCode).send(errorResponse);
}