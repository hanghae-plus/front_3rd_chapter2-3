import { UseQueryPosts } from "@/features/post/model/types";
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { useCallback, useEffect, useState } from "react";

export type UpdatableQueryKey = keyof UseQueryPosts;

// 커스텀 파서 생성
const sortOrderParser = parseAsStringEnum(["asc", "desc"] as const).withDefault("asc");

export const useQueryParams = () => {
  const [search, setSearch] = useState("");
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

  const handleUpdateQuery = useCallback(
    (key: UpdatableQueryKey, value: string | number) => {
      setQueries({
        [key]: value || null,
        priorityKey: key,
      });
    },
    [setQueries],
  );

  //FIXME: 완벽한 해결 방안은 아니라고 생각
  useEffect(() => {
    if (queries.search) {
      setSearch(queries.search);
      setQueries({
        search: "",
      });
    }
  }, [queries.search, setQueries]);

  return {
    queries: { ...queries, search },
    handleUpdateQuery,
  };
};
