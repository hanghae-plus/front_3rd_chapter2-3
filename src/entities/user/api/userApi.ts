import apiClient from "../../../shared/api/base";
import { User } from "../model/types";

export const fetchUsersApi = async () => {
    return apiClient.get<{ users: User[] }>('/users', { limit: 0, select: 'username,image' });
};

export const fetchUsersById = async (id: number) => {
    return apiClient.get<User>(`/users/${id}`);
} 