import { useModalStore } from '~/entities/modal/model/modalStore';
import { BaseModal } from '~/entities/modal/ui/BasdModal';

import { getModalInfo } from '../lib/getModalInfo';

export const ModalCombine = () => {
  const open = useModalStore.use.open();
  const changeOpen = useModalStore.use.changeOpen();
  const type = useModalStore.use.type();
  const modalInfo = getModalInfo(type);

  return <BaseModal open={open} onOpenChange={changeOpen} title={modalInfo.title} modalContent={modalInfo.content()} />;
};
