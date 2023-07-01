import { DB_USER } from "./config";

interface HttpParams {
  BASE_URL: string;
  url: string;
  method?: "GET" | "PUT" | "POST" | "PATCH" | "DELETE";
  body?: unknown | any;
  needToken?: boolean;
}

interface HttpResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

const getHeader = (token: string, needToken: boolean) => {
  const headers = needToken && {
    Authorization: `Bearer ${token}`,
  };
  return {
    ...headers,
    "content-type": "application/json",
  };
};

export const httpRequest = async (params: HttpParams) => {
  try {
    const { BASE_URL, body, method, url, needToken = true } = params;

    if (!url) throw new Error("url not passed");

    const token = localStorage.getItem(DB_USER) || "";
    const header = getHeader(token, needToken);

    const requestOption: RequestInit = {
      method: method || "GET",
      redirect: "follow",
      body: JSON.stringify(body),
      headers: header,
      // mode: "no-cors",
    };

    const response = await fetch(`${BASE_URL}${url}`, requestOption);

    const result = await response.text();

    const res = JSON.parse(result);

    return res;
  } catch (e) {
    // console.log(e);
  }
};
