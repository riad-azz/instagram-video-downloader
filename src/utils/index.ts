import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

import {
  ClientException,
  ServerException,
  TimeoutException,
} from "@/lib/exceptions";
import { ErrorResponse, SuccessResponse } from "@/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getTimedFilename = (name: string, ext: string) => {
  const timeStamp = Math.floor(Date.now() / 1000).toString();
  return `${name}-${timeStamp}.${ext}`;
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
      console.error("Axios Error:", axiosError.message);
      throw new ClientException(axiosError.message);
    } else if (axiosError.request) {
      console.error("Request Error:", axiosError.request);
      throw new TimeoutException();
    } else {
      console.error("Server Error:", axiosError.message);
      throw new ServerException("Something went wrong, please try again.");
    }
  }
};
