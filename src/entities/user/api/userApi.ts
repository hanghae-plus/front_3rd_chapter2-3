import apiClient from "../../../shared/api";
import { User } from "../model/types";

export const fetchUsersApi = async () => {
    return apiClient.get<{ users: User[] }>('/users', { limit: 0, select: 'username,image' });
};