export class Exception extends Error {
  code: number;
  /**
   * @param message
   * @param code
   */
  constructor(message = "Default Exception", code = 500) {
    super(message);
    this.code = code;
  }
}

/* Server Exceptions */

export class BadRequest extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Bad Request", code = 400) {
    super(message, code);
  }
}

export class ServerException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Internal Server Error", code = 500) {
    super(message, code);
  }
}

export class TimeoutException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Request timeout, please try again.", code = 408) {
    super(message, code);
  }
}

export class RatelimitException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Too many requests, try again later.", code = 429) {
    super(message, code);
  }
}

/* Client Exceptions */

export class ClientException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Instagram Client Exception", code = 400) {
    super(message, code);
  }
}
