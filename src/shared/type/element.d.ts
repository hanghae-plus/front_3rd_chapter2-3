type ForwardRefElement<T extends HTMLElement, P = React.HTMLAttributes<T>> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>

type DivForwardRef = ForwardRefElement<HTMLDivElement>

type HeadingForwardRef = ForwardRefElement<HTMLHeadingElement>
