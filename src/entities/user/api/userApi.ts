import apiClient from "../../../shared/api";

export const fetchUsersApi = async () => {
    return apiClient.get<{ users: any[] }>('/users', { limit: 0, select: 'username,image' });
};