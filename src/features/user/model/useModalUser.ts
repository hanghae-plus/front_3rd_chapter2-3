import useToggle from "@/shared/model/useToggle";
import { useGetUser } from "../api/use-get-user";

export const useModalUser = (userId: number) => {
  const { isOpen, toggle } = useToggle();
  const { data: userData, isLoading } = useGetUser({ id: userId, options: { enabled: isOpen } });

  return {
    isOpen,
    toggle,
    userData,
    isLoading,
  };
};
