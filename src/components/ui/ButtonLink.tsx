import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "outline";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-ink-soft",
  light: "bg-ivory text-ink hover:bg-white",
  outline: "border border-line-strong bg-transparent text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "button-md",
  sm: "button-sm",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md") =>
  [
    "motion-move inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 whitespace-nowrap",
    "transition-[background-color,color,transform] duration-300 ease-soft",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-98",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
  ].join(" ");

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
};

export default function ButtonLink({ href, children, variant = "primary", size = "md", className = "", onClick }: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}
