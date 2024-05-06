import { Exception } from "./Exception";

export class BodyException extends Exception {
  statusCode = 400;

  constructor (message: string) {
    super();
    this.message = message;
  }
}