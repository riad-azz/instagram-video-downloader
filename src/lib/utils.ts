import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { NextRequest } from "next/server";
import { APIResponse, ErrorResponse, SuccessResponse } from "@/types";
import { BadRequest } from "@/exceptions";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/17.17134",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/18.17763",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/19",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/45",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/46",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/47",
];

export const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

export const getStrTimestamp = () => Math.floor(Date.now() / 1000).toString();

export const getTimedFilename = (name: string, ext: string) => {
  return `${name}-${getStrTimestamp()}.${ext}`;
};

export const isJsonResponse = (response: Response) => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json");
};

export const getClientIp = (request: NextRequest) => {
  let ip = request.ip ?? request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? null;
    return ip;
  }
  return ip;
};

export const getHeaders = () => {
  const headers = {
    Accept: "*/*",
    "Accept-Language": "en-us,en;q=0.5",
    "Sec-Fetch-Mode": "navigate",
    Referer: "https://www.instagram.com/",
    Origin: "https://www.instagram.com",
    "User-Agent": getRandomUserAgent(),
  };

  return headers;
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

export const makeSuccessResponse = <T>(data: any) => {
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
