import { Exception } from "./Exception";

export class NotFoundException extends Exception {
  statusCode = 404;
  message = "Not found";
}