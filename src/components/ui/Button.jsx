// src/components/ui/Button.jsx

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 cursor-pointer font-manrope disabled:pointer-events-none active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-primary hover:bg-primary/90 text-white border border-transparent",
        secondary:
          "bg-foreground_primary hover:bg-foreground_primary/85 text-primary hover:text-gray-50 font-bold border border-transparent",
        outline:
          "bg-transparent hover:bg-primary/10 text-primary border-2 border-primary/30",
        ghost:
          "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent",
      },

      size: {
        default: "px-4 xl:px-5 py-2 xl:py-2.5 text-sm",
        xl: "px-8 py-4 leading-[155%] font-semibold text-lg",
        lg: "px-6 py-3 leading-[150%] font-semibold text-base",
        md: "px-5 py-2.5 leading-[146%] font-bold text-base",
        sm: "px-2 lg:px-4 py-1 lg:py-2 leading-[130%] font-medium text-sm",
        xs: "px-3 py-1 leading-[100%] font-medium text-xs",
      },

      rounded: {
        default: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
        xs: "rounded-xs",
        none: "rounded-none",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "default",
  rounded = "default",
  asChild = false,
  disabled = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-rounded={rounded}
      disabled={disabled}
      className={cn(
        buttonVariants({
          variant,
          size,
          rounded,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
