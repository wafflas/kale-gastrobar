import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const BASE_STYLES =
  "font-ubuntu font-medium tracking-widest px-6 py-3 uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed leading-none cursor-pointer";

const VARIANT_STYLES = {
  primary: "bg-darkbrown text-cream hover:bg-lightbrown hover:scale-105",
  secondary: "bg-cream text-darkbrown hover:bg-opacity-90 hover:scale-105",
  outline:
    "bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-darkbrown hover:scale-105",
} as const;

const SIZE_STYLES = {
  sm: "text-xs md:text-sm rounded-full",
  md: "text-sm md:text-base rounded-full",
  lg: "w-[95vw] lg:w-[70vw] text-lg rounded-full",
} as const;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {

    const widthStyle = fullWidth ? "w-full" : "";

    const combinedClassName = [
      BASE_STYLES,
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      widthStyle,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
