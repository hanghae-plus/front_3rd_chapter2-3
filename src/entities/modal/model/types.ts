export interface IBaseModalProps {
  title: string | React.ReactNode;
  modalContent: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export type ModalType = 'addPost' | 'updatePost';
