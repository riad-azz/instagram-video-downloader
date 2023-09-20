import { NextRequest } from "next/server";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { APIResponse, ErrorResponse, SuccessResponse } from "@/types";
import { userAgents } from "./constants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const fakeDelay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getStrTimestamp = () => Math.floor(Date.now() / 1000).toString();

export const getTimedFilename = (name: string, ext: string) => {
  return `${name}-${getStrTimestamp()}.${ext}`;
};

export const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

export const isJsonResponse = (response: Response) => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json");
};

export const getClientIp = (request: NextRequest) => {
  let ip: string | null;

  ip = request.ip ?? request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? null;
  }

  return ip;
};

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

export const makeHttpRequest = async <T>({
  ...args
}: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response: AxiosResponse = await axios(args);

    const successResponse = makeSuccessResponse<T>(response.data);
    return successResponse;
  } catch (error: any) {
    const axiosError: AxiosError = error;
    if (axiosError.response) {
      return makeErrorResponse(axiosError.message);
    } else if (axiosError.request) {
      console.log("Request Error:", axiosError.request);
      return makeErrorResponse("Request timeout, please try again.");
    } else {
      console.log("Error:", axiosError.message);
      return makeErrorResponse("Something went wrong, please try again.");
    }
  }
};
