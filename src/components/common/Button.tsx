import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-emerald to-emerald-light text-white shadow-ambient hover:-translate-y-0.5 hover:shadow-lift",
  secondary: "bg-saffron text-ink shadow-ambient hover:-translate-y-0.5 hover:shadow-lift",
  ghost: "bg-transparent text-muted hover:bg-emerald-soft",
  danger: "bg-clay text-white shadow-ambient hover:-translate-y-0.5 hover:shadow-lift",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  isLoading = false,
  leftIcon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon}
      {isLoading ? "Loading..." : children}
    </button>
  );
}
