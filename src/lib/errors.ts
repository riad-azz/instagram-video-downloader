// Client Errors

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NetworkError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}

export class HTTPError extends CustomError {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
  }
}

/* Server Exceptions */

export class BadRequest extends HTTPError {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Bad Request", code = 400) {
    super(message, code);
  }
}

export class ServerException extends HTTPError {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Internal Server Error", code = 500) {
    super(message, code);
  }
}

export class TimeoutException extends HTTPError {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Request timeout, please try again.", code = 408) {
    super(message, code);
  }
}

export class RatelimitException extends HTTPError {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Too many requests, try again later.", code = 429) {
    super(message, code);
  }
}
