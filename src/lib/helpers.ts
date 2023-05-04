import axios from "axios";
import { TimeoutException } from "@/exceptions";

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
  data?: any;
  throwError?: boolean;
}

export const axiosFetch = async ({
  url,
  method = "GET",
  throwError = false,
  headers,
  timeout,
  data,
}: IAxiosFetchFunction) => {
  let response;
  try {
    response = await axios({ url, method, headers, timeout, data });
    return response;
  } catch (error: any) {
    if (error.message.includes("timeout")) {
      throw new TimeoutException();
    }
    if (throwError) {
      throw error;
    } else {
      return null;
    }
  }
};

export const getCsrfToken = async () => {
  const loginPageUrl = "https://www.instagram.com/accounts/login/";
  const response = await axiosFetch({ url: loginPageUrl });
  if (!response) {
    console.error("Failed to fetch Instagram CSRF token page");
    return null;
  }
  const htmlText = response.data;

  const regex = /\\"csrf_token\\":\\"(.*?)\\"/;
  const match = regex.exec(htmlText);

  if (match) {
    const csrfToken = match[1];
    return csrfToken;
  } else {
    console.error("Instagram CSRF token not found.");
    return null;
  }
};

export const ajaxLogin = async (username: string, password: string) => {
  const loginUrl = "https://www.instagram.com/accounts/login/ajax/";
  const csrfToken = await getCsrfToken();
  if (!csrfToken) {
    return null;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const headers = {
    "user-agent": getRandomUserAgent(),
    referer: "https://www.instagram.com/accounts/login/",
    "Content-Type": "application/x-www-form-urlencoded",
    "X-CSRFToken": csrfToken,
  };

  const data = {
    username: username,
    enc_password: `#PWD_INSTAGRAM_BROWSER:0:${timestamp}:${password}`,
    queryParams: {},
    optIntoOneTap: "false",
  };

  const response = await axiosFetch({
    url: loginUrl,
    method: "POST",
    headers: headers,
    data: data,
  });

  if (!response) {
    console.error("Login to instagram failed");
    return null;
  }

  const cookies = response.headers["set-cookie"];
  if (!cookies) {
    console.error("No cookies found");
    return null;
  }

  return cookies;
};
