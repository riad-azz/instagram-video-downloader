import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

import { userAgents } from "./constants";
import {
  ClientException,
  ServerException,
  TimeoutException,
} from "@/lib/exceptions";
import { ErrorResponse, SuccessResponse } from "@/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
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

export const makeHttpRequest = async ({
  ...args
}: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios(args);
    return response;
  } catch (error: any) {
    const axiosError: AxiosError = error;
    if (axiosError.response) {
      console.log("Axios Error:", axiosError.message);
      throw new ClientException(axiosError.message);
    } else if (axiosError.request) {
      console.log("Request Error:", axiosError.request);
      throw new TimeoutException();
    } else {
      console.log("Server Error:", axiosError.message);
      throw new ServerException("Something went wrong, please try again");
    }
  }
};
