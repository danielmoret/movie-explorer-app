import { forwardRef } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "default" | "sm" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-black font-medium hover:opacity-90 disabled:opacity-50",
  ghost:
    "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
  outline:
    "border border-white/20 text-foreground hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 text-sm rounded-full",
  sm: "h-8 px-3 text-sm rounded-full",
  icon: "h-9 w-9 rounded-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center cursor-pointer transition-colors disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
