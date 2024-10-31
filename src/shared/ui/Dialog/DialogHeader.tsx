import { HTMLAttributes } from "react";

interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
);

DialogHeader.displayName = "DialogHeader";