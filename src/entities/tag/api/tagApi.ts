import apiClient from "../../../shared/api";


export const fetchTagsApi = async () => {
    return apiClient.get('/posts/tags');
};