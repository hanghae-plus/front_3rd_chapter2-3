import { forwardRef, HTMLAttributes } from 'react';
import { X } from 'lucide-react';
import { Root, Trigger, Portal, Overlay, Content, Close, Title } from '@radix-ui/react-dialog';
import { WithClassName } from '@shared/model/types';

// 대화상자 컴포넌트
export const Dialog = Root;
export const DialogTrigger = Trigger;

export const DialogContent = forwardRef<HTMLDivElement, WithClassName<typeof Portal>>(
  ({ className, children, ...props }, ref) => (
    <Portal>
      <Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Content
        ref={ref}
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full ${className}`}
        {...props}
      >
        {children}
        <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </Close>
      </Content>
    </Portal>
  ),
);
DialogContent.displayName = Content.displayName;

interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = forwardRef<HTMLHeadingElement, WithClassName<typeof Title>>(
  ({ className, ...props }, ref) => (
    <Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);
DialogTitle.displayName = Title.displayName;
