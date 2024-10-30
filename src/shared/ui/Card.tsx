import { mixinClasses } from "@/shared/lib/utils";
import { forwardRef } from "react";

// Card Container ======================================================

type CardContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const CardContainer = forwardRef<HTMLDivElement, CardContainerProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={mixinClasses("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
));
CardContainer.displayName = "CardContainer";

// Card Header ======================================================

type CardHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={mixinClasses("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

// Card Title ======================================================

type CardTitleProps = {
  className?: string;
  children: React.ReactNode;
};

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={mixinClasses("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

// Card Content ======================================================

type CardContentProps = {
  className?: string;
  children: React.ReactNode;
};

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={mixinClasses("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const Card = Object.assign({
  Container: CardContainer,
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
});
