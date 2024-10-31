import { FC, HTMLAttributes } from "react";

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    size?: AvatarSize;
    src?: string;
    alt?: string;
  }
  

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10"
};

export const Avatar: FC<AvatarProps> = ({ 
    size = 'md',
    className = "",
    src,
    alt = "",
    ...props 
  }) => {
    return (
      <div
        className={`relative flex shrink-0 overflow-hidden rounded-full ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      </div>
    );
  };