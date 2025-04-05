import { HTTP_CODE_ENUM } from "./http-codes";

type FetchJsonResponse<T> =
  | { status: HTTP_CODE_ENUM.OK | HTTP_CODE_ENUM.CREATED; data: T }
  | {
      status: HTTP_CODE_ENUM.NO_CONTENT | HTTP_CODE_ENUM.SERVICE_UNAVAILABLE;
      data: undefined;
    }
  | {
      status: HTTP_CODE_ENUM.SERVICE_UNAVAILABLE;
      data: undefined;
    }
  | {
      status:
        | HTTP_CODE_ENUM.NOT_FOUND
        | HTTP_CODE_ENUM.BAD_REQUEST
        | HTTP_CODE_ENUM.TOO_MANY_REQUESTS
        | HTTP_CODE_ENUM.UNPROCESSABLE_ENTITY
        | HTTP_CODE_ENUM.INTERNAL_SERVER_ERROR;
      data: {
        error: string;
        message: string;
        statusCode: HTTP_CODE_ENUM.TOO_MANY_REQUESTS;
      };
    };

export async function wrapperFetchJsonResponse<T>(
  response: Response
): Promise<FetchJsonResponse<T>> {
  const status = response.status as FetchJsonResponse<T>["status"];
  return {
    status,
    data: [
      HTTP_CODE_ENUM.NO_CONTENT,
      HTTP_CODE_ENUM.SERVICE_UNAVAILABLE,
    ].includes(status)
      ? undefined
      : await response.json(),
  };
}
