import { useQueryParams } from "@/shared/model/useQueryParams";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type UseSearchDebounceProps = {
  delay?: number;
};

export const useSearchDebounce = ({ delay = 0 }: UseSearchDebounceProps = {}) => {
  const { queries } = useQueryParams();
  const { search: currentSearch } = queries;
  const [search, setSearch] = useState(currentSearch);

  const { handleUpdateQuery } = useQueryParams();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const debouncedSearch = useDebouncedCallback((value) => {
    handleUpdateQuery("search", value);
  }, delay);

  const handleKeyDown = useCallback(
    (value: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        debouncedSearch(value);
      }
    },
    [debouncedSearch],
  );

  return {
    search,
    handleSearch,
    handleKeyDown,
  };
};
