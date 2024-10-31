import { create } from 'zustand'

import {api} from '../../../shared/api/base';
import { User } from './type'

export type UserState = {
  selectecdUser: User | null
  loading: boolean
  
   // 액션
   fetchUserDetails: (userId: number) => Promise<void>;
   setSelectedUser: (user:User | null) => void;
}

export const useUserStore = create<UserState>((set)=>({
  selectecdUser: null,
  loading: false,

  fetchUserDetails: async (userId: number) => {
    set({loading: true});
    try {
      const response = await api.get(`/users/${userId}`);
      set({selectecdUser: response.data});
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      set({loading: false});
    }
  },
  setSelectedUser: (user:User|null) => {
    set({selectecdUser: user});
  }
})
)