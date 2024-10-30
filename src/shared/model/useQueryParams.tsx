import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { useCallback } from "react";

export type UpdatableQueryKey = "skip" | "limit" | "search" | "sortBy" | "sortOrder" | "tag";

// 커스텀 파서 생성
const sortOrderParser = parseAsStringEnum(["asc", "desc"] as const).withDefault("asc");

export const useQueryParams = () => {
  const [queries, setQueries] = useQueryStates(
    {
      priorityKey: parseAsString.withDefault(""),
      skip: parseAsInteger.withDefault(0),
      limit: parseAsInteger.withDefault(10),
      search: parseAsString.withDefault(""),
      sortBy: parseAsString.withDefault(""),
      sortOrder: sortOrderParser,
      tag: parseAsString.withDefault(""),
    },
    {
      shallow: true,
      history: "replace",
    },
  );

  const handleUpdateQuery = useCallback((key: UpdatableQueryKey, value: string | number) => {
    setQueries({
      [key]: value || null,
      priorityKey: key,
    });
  }, []);

  return {
    queries,
    handleUpdateQuery,
  };
};
