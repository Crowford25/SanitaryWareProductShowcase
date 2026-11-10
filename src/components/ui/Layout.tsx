import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export function SectionHeader({ label, title, description, tone = "light", id, className = "" }: SectionHeaderProps) {
  const muted = tone === "dark" ? "text-on-night-muted" : "text-muted";
  return (
    <header className={`max-w-[680px] ${className}`}>
      <p className={`caption-3 uppercase tracking-widest ${muted}`}>{label}</p>
      <h2 id={id} className="mt-3 heading-4 md:heading-2">
        {title}
      </h2>
      {description ? <p className={`mt-4 body-3 md:body-7 ${muted}`}>{description}</p> : null}
    </header>
  );
}
