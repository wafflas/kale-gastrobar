import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-ubuntu font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed leading-none";

  const variantStyles = {
    primary:
      "bg-darkbrown text-cream hover:bg-lightbrown hover:scale-105 drop-shadow-2xl",
    secondary:
      "bg-cream text-darkbrown hover:bg-opacity-90 hover:scale-105 drop-shadow-2xl",
    outline:
      "bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-darkbrown hover:scale-105 drop-shadow-2xl",
  };

  const sizeStyles = {
    sm: "px-6 py-2 text-xs md:text-sm rounded-full",
    md: "px-8 py-3 text-sm md:text-base rounded-full",
    lg: "px-10 py-4 text-base md:text-lg rounded-full",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
