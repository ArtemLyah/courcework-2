export interface SerializedException {
  statusCode: number;
  error: string;
  message: string | string[];
}

export class Exception extends Error {
  statusCode = 500;
  message = "Internal server error";

  serialize (): SerializedException {
    return {
      statusCode: this.statusCode,
      error: this.constructor.name,
      message: this.message
    };
  }
}