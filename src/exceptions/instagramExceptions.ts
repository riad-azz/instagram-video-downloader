export class IGException extends Error {
  code: number;
  /**
   * @param message
   * @param code
   */
  constructor(message = "Instagram Exception", code = 500) {
    super(message);
    this.code = code;
  }
}

/* Server Exceptions */

export class IGBadRequest extends IGException {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Bad Request", code = 400) {
    super(message, code);
  }
}

export class IGServerError extends IGException {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Internal Server Error", code = 500) {
    super(message, code);
  }
}

/* Client Exceptions */

export class IGClientException extends IGException {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Instagram Client Exception", code = 400) {
    super(message, code);
  }
}
