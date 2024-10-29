import { tagApi } from "@/entities/tag/api/tagApi";
import { apiHandler } from "@/shared/api/apiHandler";
import { useEffect, useState } from "react";
import { Tag } from "../../../entities/tag/model/types";

const useFetchTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const tags = await apiHandler(tagApi.fetchTags, (error) => console.error("태그 가져오기 오류:", error));
      setTags(tags);
      setIsLoading(false);
    })();
  }, []);
  return { tags, isLoading };
};

export default useFetchTags;
