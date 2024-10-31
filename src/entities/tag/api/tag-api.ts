import { fetchApi } from "@/shared/lib/api";
import { TAG_API_PATHS } from "../config/tag-api-paths";
import { Tag } from "../model/types";

// query
const getTags = async () => {
  const response = await fetchApi<Tag[]>(TAG_API_PATHS.base);
  return response;
};

// ======================================================

// total
export const tagApi = Object.freeze({ getTags });
