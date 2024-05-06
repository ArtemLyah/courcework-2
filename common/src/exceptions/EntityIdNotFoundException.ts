import { Exception } from "./Exception";

export class EntityIdNotFoundException extends Exception {
  statusCode = 400;

  constructor (entity: string) {
    super();
    this.message = `Entity ${entity} with such id not found`;
  }
}