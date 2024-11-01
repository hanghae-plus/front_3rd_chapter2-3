class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

interface RequestOptions<TBody> extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: TBody;
}

const buildUrl = async (
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<string> => {
  if (!params) {
    return `/api${endpoint}`;
  }

  const queryString = Object.entries(params)
    .reduce((acc, [key, value]) => {
      if (value !== undefined) {
        const encodedValue = encodeURIComponent(String(value));
        return [...acc, `${key}=${encodedValue}`];
      }
      return acc;
    }, [] as string[])
    .join('&');

  return `/api${endpoint}${queryString ? `?${queryString}` : ''}`;
};

const apiClient = async <TResponse, TBody = never>(
  endpoint: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> => {
  const { params, body, headers, ...restOptions } = options;

  const url = await buildUrl(endpoint, params);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...(body && { body: JSON.stringify(body) }),
    ...restOptions
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
};

export const api = {
  get: async <TResponse>(
    endpoint: string,
    options: Omit<RequestOptions<never>, 'body'> = {}
  ): Promise<TResponse> => {
    return apiClient<TResponse>(endpoint, {
      ...options,
      method: 'GET'
    });
  },

  post: async <TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options: Omit<RequestOptions<TBody>, 'body'> = {}
  ): Promise<TResponse> => {
    return apiClient<TResponse, TBody>(endpoint, {
      ...options,
      method: 'POST',
      body
    });
  },

  patch: async <TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options: Omit<RequestOptions<TBody>, 'body'> = {}
  ): Promise<TResponse> => {
    return apiClient<TResponse, TBody>(endpoint, {
      ...options,
      method: 'PATCH',
      body
    });
  },

  put: async <TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options: Omit<RequestOptions<TBody>, 'body'> = {}
  ): Promise<TResponse> => {
    return apiClient<TResponse, TBody>(endpoint, {
      ...options,
      method: 'PUT',
      body
    });
  },

  delete: async <TResponse>(
    endpoint: string,
    options: Omit<RequestOptions<never>, 'body'> = {}
  ): Promise<TResponse> => {
    return apiClient<TResponse>(endpoint, {
      ...options,
      method: 'DELETE'
    });
  }
};
