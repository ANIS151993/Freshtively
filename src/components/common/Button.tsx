import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-emerald text-white shadow-sm hover:bg-[#005f3f]",
  secondary: "bg-[#f3a21b] text-[#241400] shadow-sm hover:bg-[#e4930f]",
  ghost: "border border-[#cfd8d0] bg-white text-muted shadow-sm hover:border-emerald hover:text-emerald",
  danger: "bg-clay text-white shadow-sm hover:bg-[#8d2f2f]",
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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon}
      {isLoading ? "Loading..." : children}
    </button>
  );
}
