import { useEffect, useState } from "react";
import { Tag } from "../model/types";

const useFetchTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/posts/tags");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("태그 가져오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTags();
  }, []);
  return { tags, isLoading };
};

export default useFetchTags;
