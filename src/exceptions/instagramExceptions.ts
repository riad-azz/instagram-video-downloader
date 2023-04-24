export class InstagramException extends Error {
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

export class BadRequest extends InstagramException {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Bad Request", code = 400) {
    super(message, code);
  }
}

export class ServerError extends InstagramException {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Internal Server Error", code = 500) {
    super(message, code);
  }
}
