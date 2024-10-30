import { fetchApi } from "@/shared/lib/api";
import { TAG_API_PATHS } from "../config/tag-api-paths";
import { Tag } from "../model/types";

const fetchTags = async () => {
  const response = await fetchApi<Tag[]>(TAG_API_PATHS.base);
  return response;
};

export const tagApi = Object.freeze({ fetchTags });
