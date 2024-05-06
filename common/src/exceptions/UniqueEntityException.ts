import { Exception } from "./Exception";

export class UniqueEntityException extends Exception {
  statusCode = 400;

  constructor (entity: string) {
    super();
    this.message = `New ${entity} must be unique`;
  }
}