type FetchProps = Parameters<typeof fetch>

export const safeFetch = async <T>(input: FetchProps[0], init?: FetchProps[1]): Promise<T> => {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return (await response.json()) as T
}

safeFetch.post = async <T>(
  input: FetchProps[0],
  body?: Record<string, unknown> | null,
  init?: FetchProps[1],
): Promise<T> => {
  const options: FetchProps[1] = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: JSON.stringify(body),
    ...init,
  }

  return safeFetch<T>(input, options)
}
