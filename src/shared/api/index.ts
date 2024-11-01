import axios from "axios";

interface AxiosRequestConfig<T> {
  method: string;
  url: string;
  headers: headers;
  data?: T;
}

interface headers {
  [key: string]: string;
}

const request = <T>(method: string) => {
  return async (path: string, body?: T) => {
    const headers: headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
    const axiosConfig: AxiosRequestConfig<T> = {
      method,
      url: path,
      headers,
      data: body,
    };

    try {
      const res = await axios(axiosConfig);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

const apiRequest = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
  patch: request("PATCH"),
};

export default apiRequest;
