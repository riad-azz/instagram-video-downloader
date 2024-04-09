import { NextRequest } from "next/server";

import { CustomError, HTTPError } from "./errors";
import { ErrorResponse, SuccessResponse } from "@/types";

export function isUnauthorizedError(error: any) {
  if (!error) return false;

  if (error instanceof HTTPError) {
    return error.status === 401;
  }

  return false;
}

export function isForbiddenError(error: any) {
  if (!error) return false;

  if (error instanceof HTTPError) {
    return error.status === 403;
  }

  return false;
}

export function isNotFoundError(error: any) {
  if (!error) return false;

  if (error instanceof HTTPError) {
    return error.status === 404;
  }

  return false;
}

export const getIpFromRequest = (request: NextRequest) => {
  let ip: string | null;

  ip = request.ip ?? request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? null;
  }

  return ip;
};

export function getStatusCodeErrorMessage(code: number): string {
  switch (code) {
    case 400:
      return "Oops! It seems like the request wasn't quite right.";
    case 401:
      return "There seems to be a connection problem. Please try again later.";
    case 403:
      return "You don't have permission to do this. Please contact support.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 500:
      return "Oh no, something's gone wrong on our end. We're on it!";
    case 502:
      return "We're having some issues. Hang tight, we'll be back soon.";
    case 503:
      return "Service is currently unavailable. We're working hard to resolve this.";
    case 504:
      return "This is taking longer than usual. Try refreshing?";
    default:
      return "Oops! Something went wrong.";
  }
}

export function getErrorFromResponseData(data: any): string | null {
  if (data?.message) {
    if (Array.isArray(data.message)) {
      return data.message.join(", ");
    } else if (typeof data.message === "string") {
      return data.message as string;
    }
  }

  if (data?.errors) {
    const errorMessages = [];
    for (const [field, errors] of Object.entries(data.errors)) {
      if (Array.isArray(errors)) {
        errors.forEach((error) => errorMessages.push(error));
      } else {
        errorMessages.push(errors);
      }
    }
    return errorMessages.join(", ");
  }

  return null;
}

export function getHttpErrorMessage(error: any): string | null {
  if (!error) return null;

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof CustomError) {
    return error.message;
  }

  return "Oops! Something went wrong.";
}

export const makeSuccessResponse = <T extends any>(data: T) => {
  const response: SuccessResponse<T> = {
    status: "success",
    data: data,
  };
  return response;
};

export const makeErrorResponse = (
  message: string = "Internal Server Error"
) => {
  const response: ErrorResponse = {
    status: "error",
    message: message,
  };
  return response;
};
