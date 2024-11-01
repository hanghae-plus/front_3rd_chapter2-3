import { create } from "zustand"

type ModalStore = {
  showUserModal: boolean
  openUserModal: () => void
  closeUserModal: () => void

  showPostModal: boolean
  openPostModal: () => void
  closePostModal: () => void

  showAddCommentModal: boolean
  openAddCommentModal: () => void
  closeAddCommentModal: () => void

  showEditPostModal: boolean
  openEditPostModal: () => void
  closeEditPostModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  showUserModal: false,
  openUserModal: () => set({ showUserModal: true }),
  closeUserModal: () => set({ showUserModal: false }),

  showPostModal: false,
  openPostModal: () => set({ showPostModal: true }),
  closePostModal: () => set({ showPostModal: false }),

  showAddCommentModal: false,
  openAddCommentModal: () => set({ showAddCommentModal: true }),
  closeAddCommentModal: () => set({ showAddCommentModal: false }),

  showEditPostModal: false,
  openEditPostModal: () => set({ showEditPostModal: true }),
  closeEditPostModal: () => set({ showEditPostModal: false }),
}))
