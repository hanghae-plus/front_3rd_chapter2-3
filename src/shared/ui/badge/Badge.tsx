import { FC } from "react";

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  success: "bg-green-500 text-white hover:bg-green-600",
  warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  info: "bg-blue-500 text-white hover:bg-blue-600",
} as const;

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &{
    variant?: keyof typeof variants;
}

export const Badge: FC<BadgeProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`inline-flex items-center rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  );
};