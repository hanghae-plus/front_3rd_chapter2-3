import { ChangeEvent, forwardRef, KeyboardEvent } from "react";

interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onKeyPress?: (_e: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 
          text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium
          placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});
Input.displayName = "Input";
