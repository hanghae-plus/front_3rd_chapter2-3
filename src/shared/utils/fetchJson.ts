export const fetchJson = async (
  url: string,
  requestInit: Omit<RequestInit, "body"> & { body?: Record<string, unknown> },
) => {
  try {
    const response = await fetch(url, {
      headers: {
        ...requestInit?.headers,
        "Content-Type": "application/json",
      },
      ...{ body: JSON.stringify(requestInit?.body) },
      method: requestInit?.method,
    })
    return await response.json()
  } catch (error) {
    throw new Error(`Failed to ${url}: ${error}`)
  }
}
