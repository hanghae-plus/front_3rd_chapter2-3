import { useEffect, useMemo, useState } from "react"

export const useSearchPost = (initialSearch: string) => {
  const [search, setSearch] = useState<string>(initialSearch)

  useEffect(() => {
    setSearch(initialSearch)
  }, [initialSearch])

  return { search: useMemo(() => search, [search]), setSearch }
}
