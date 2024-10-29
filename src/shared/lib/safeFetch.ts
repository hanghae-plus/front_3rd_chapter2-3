type FetchProps = Parameters<typeof fetch>

export async function safeFetch<T>(input: FetchProps[0], init?: FetchProps[1]): Promise<T> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return (await response.json()) as T
}
