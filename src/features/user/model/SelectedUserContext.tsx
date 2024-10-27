import { User } from "@/widgets/user/api/types";
import { createContext, useContext, useState } from "react";

type SelectedUserContextType = {
  selectedUser: User | null;
  handleSelectUser: (user: User | null) => void;
};

const SelectedUserContext = createContext<SelectedUserContextType | null>(null);

type SelectedUserProviderProps = {
  children: React.ReactNode;
};

export const SelectedUserProvider = ({ children }: SelectedUserProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User | null) => {
    setSelectedUser(user);
  };

  return (
    <SelectedUserContext.Provider value={{ selectedUser, handleSelectUser }}>{children}</SelectedUserContext.Provider>
  );
};

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error("useSelectedUser must be used within a SelectedUserProvider");
  }
  return context;
};
