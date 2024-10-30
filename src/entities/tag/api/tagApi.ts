import apiInstance from "../../../shared/lib/apiInstance";
import { Tags } from "./types";

// 태그 가져오기
export const fetchTags = async ():Promise<Tags> =>{
  return await apiInstance("/api/posts/tags");
}
