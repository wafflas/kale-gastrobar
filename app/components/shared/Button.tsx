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
    "font-ubuntu font-medium tracking-widest px-6 py-3 uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed leading-none";

  const variantStyles = {
    primary: "bg-darkbrown text-cream hover:bg-lightbrown hover:scale-105",
    secondary: "bg-cream text-darkbrown hover:bg-opacity-90 hover:scale-105",
    outline:
      "bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-darkbrown hover:scale-105",
  };

  const sizeStyles = {
    sm: "text-xs md:text-sm rounded-full",
    md: "text-sm md:text-base rounded-full",
    lg: "w-[95vw] lg:w-[70vw] text-lg rounded-full",
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
