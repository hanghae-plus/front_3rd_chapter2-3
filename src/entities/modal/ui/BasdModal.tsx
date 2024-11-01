import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/shared/ui/Dialog';

import { IBaseModalProps } from '../model/types';

export const BaseModal = (props: IBaseModalProps) => {
  const { title, modalContent, open, onOpenChange } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {modalContent}
      </DialogContent>
    </Dialog>
  );
};
