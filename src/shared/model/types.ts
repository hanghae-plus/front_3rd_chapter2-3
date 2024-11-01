import { PropsWithChildren, ComponentPropsWithoutRef, ElementType } from 'react';

export type WithClassName<T extends ElementType> = PropsWithChildren<ComponentPropsWithoutRef<T>> & {
  className?: string;
};

export interface ApiResponse {
  total: number;
  skip: number;
  limit: number;
}
