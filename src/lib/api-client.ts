import { CustomError, HTTPError, NetworkError } from "./errors";

import { getErrorFromResponseData, getStatusCodeErrorMessage } from "./http";

export type APIClientOptions = RequestInit & {
  baseURL?: string;
  noBaseURL?: boolean;
  authRetries?: number;
  withCredentials?: boolean;
};

export class APIClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  _getRequestUrl(endpoint: string, options?: APIClientOptions) {
    if (options?.noBaseURL) {
      return endpoint;
    }

    const baseUrl = options?.baseURL ?? this.baseURL;

    if (!endpoint.startsWith("/")) {
      return `${baseUrl}/${endpoint}`;
    }

    return `${baseUrl}${endpoint}`;
  }

  async _getResponseErrors(response: Response) {
    const statusError = getStatusCodeErrorMessage(response.status);
    try {
      const data = await response.json();
      const responseError = getErrorFromResponseData(data);
      if (!responseError) {
        return statusError;
      }

      return responseError;
    } catch (error) {
      return statusError;
    }
  }

  async fetch(url: string, options?: APIClientOptions) {
    let response;

    try {
      response = await fetch(url, options);

      if (!response.ok) {
        const errorMessage = await this._getResponseErrors(response);
        throw new HTTPError(errorMessage, response.status);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw new CustomError("The request was aborted by the user");
      } else if (error.name === "SyntaxError" || error.name === "TypeError") {
        throw new CustomError("Oops! Looks like the client is having issues");
      }

      if (error.name === "NetworkError") {
        throw new NetworkError(
          "Network error, check your internet connection and try again"
        );
      } else if (error.name === "SecurityError") {
        throw new NetworkError(
          "We are having issues connecting to the server. Please try again later"
        );
      }

      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError("Oops! looks like something went wrong");
    }

    return response;
  }

  async get(endpoint: string, options?: APIClientOptions) {
    const requestUrl = this._getRequestUrl(endpoint, options);

    return this.fetch(requestUrl, {
      ...options,
      method: "GET",
    });
  }

  async post(endpoint: string, options?: APIClientOptions) {
    const requestUrl = this._getRequestUrl(endpoint, options);

    return this.fetch(requestUrl, {
      ...options,
      method: "POST",
    });
  }

  async put(endpoint: string, options?: APIClientOptions) {
    const requestUrl = this._getRequestUrl(endpoint, options);

    return this.fetch(requestUrl, {
      ...options,
      method: "PUT",
    });
  }

  async delete(endpoint: string, options?: APIClientOptions) {
    const requestUrl = this._getRequestUrl(endpoint, options);

    return this.fetch(requestUrl, {
      ...options,
      method: "DELETE",
    });
  }

  async patch(endpoint: string, options?: APIClientOptions) {
    const requestUrl = this._getRequestUrl(endpoint, options);

    return this.fetch(requestUrl, {
      ...options,
      method: "PATCH",
    });
  }
}

const apiClient = new APIClient("/api");

export { apiClient };
