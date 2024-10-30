type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const createRequestOptions = (method: HttpMethod, body?: unknown): RequestInit => ({
  method,
  headers: body ? { "Content-Type": "application/json" } : undefined,
  body: body ? JSON.stringify(body) : undefined,
});

const createQueryParams = (searchParams?: Record<string, string | number>) => {
  const queryParams = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
  }
  return queryParams;
};

export const fetchApi = async <T>(
  url: string,
  options?: RequestInit & { searchParams?: Record<string, string | number> },
): Promise<T> => {
  const searchParams = options?.searchParams;
  const queryParams = createQueryParams(searchParams);
  const fullUrl = searchParams ? `${url}?${queryParams.toString()}` : url;
  const response = await fetch(fullUrl, options);
  return response.json();
};
