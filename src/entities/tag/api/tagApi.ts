import apiClient from "../../../shared/api/base";
import { Tag } from "../model/types";


export const fetchTagsApi = async () => {
    return apiClient.get<Tag[]>('/posts/tags');
};