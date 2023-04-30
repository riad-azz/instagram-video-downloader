import axios from "axios";
import { IGTimeout } from "@/exceptions/instagramExceptions";

const userAgents = [
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

interface IAxiosFetchFunction {
  url: string;
  headers?: object;
  timeout?: number;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
  throwError?: boolean;
}

export const axiosFetch = async ({
  url,
  method = "GET",
  throwError = false,
  headers,
  timeout,
}: IAxiosFetchFunction) => {
  let response;
  try {
    response = await axios({ url, method, headers, timeout });
    return response;
  } catch (error: any) {
    if (error.message.includes("timeout")) {
      throw new IGTimeout();
    }
    if (throwError) {
      throw error;
    } else {
      return null;
    }
  }
};
