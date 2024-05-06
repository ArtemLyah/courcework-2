import { ValidationError } from "class-validator";
import { Exception, SerializedException } from "./Exception";

export class ValidationException extends Exception {
  statusCode = 400;
  errors: ValidationError[];
  field: string;

  constructor (errors: ValidationError[], field: string) {
    super();
    this.errors = errors;
    this.field = field;
  }

  serialize (): SerializedException {
    const messages: string[] = [];

    for (const error of this.errors) {
      Object.values(error.constraints ?? {}).forEach((message) => {
        messages.push(`obj.${this.field}.${error.property}: ${message}`);
      });
    }

    return {
      statusCode: this.statusCode,
      error: this.constructor.name,
      message: messages,
    };
  }
}