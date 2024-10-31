import { atom, useAtom } from "jotai"

// jotai atom
export const loadingAtom = atom(false)

export const useLoading = () => {
  const [loading, setLoading] = useAtom(loadingAtom)
  return {
    loading,
    setLoading,
  }
}
