import {
  HTMLAttributes,
  ReactNode,
} from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string
  children?: ReactNode
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}
