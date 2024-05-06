import { Exception } from "./Exception";

export class RequestBodyException extends Exception {
  statusCode = 400;

  constructor(field: string) {
    super();
    this.message = `Request missed ${field} field`;
  }
}