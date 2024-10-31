export const createQueryString = (params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, String(value));
    });
    return searchParams.toString();
  };