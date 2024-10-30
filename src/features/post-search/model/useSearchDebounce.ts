import { useQueryParams } from "@/shared/model/useQueryParams";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type UseSearchDebounceProps = {
  delay?: number;
};

export const useSearchDebounce = ({ delay = 1000 }: UseSearchDebounceProps = {}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, delay);
  const { handleUpdateQuery } = useQueryParams();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleKeyDown = (value: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateQuery("search", value);
    }
  };

  useEffect(() => {
    handleUpdateQuery("search", debouncedSearch);
  }, [debouncedSearch, handleUpdateQuery]);

  return {
    search,
    handleSearch,
    debouncedSearch,
    handleKeyDown,
  };
};
