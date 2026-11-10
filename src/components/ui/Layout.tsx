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

type EditorialHeaderProps = {
  /** Section number shown in the left margin, for example "01". */
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

/** Magazine style header: number and label in the left margin, heading offset into the grid. */
export function EditorialHeader({ index, label, title, aside, tone = "light", id, className = "" }: EditorialHeaderProps) {
  const muted = tone === "dark" ? "text-on-night-muted" : "text-muted";
  const accent = tone === "dark" ? "text-brass" : "text-brass-deep";
  return (
    <header className={`grid gap-4 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <p className={`caption-3 uppercase tracking-widest lg:col-span-3 lg:pt-3 ${muted}`}>
        <span className={accent}>{index}</span>
        <span aria-hidden="true"> · </span>
        {label}
      </p>
      <div className="lg:col-span-9">
        <h2 id={id} className="max-w-[680px] heading-4 md:heading-3">
          {title}
        </h2>
        {aside ? <div className={`mt-4 max-w-[560px] body-3 ${muted}`}>{aside}</div> : null}
      </div>
    </header>
  );
}

/** A hairline rule. Used between rows instead of boxing content into cards. */
export function Rule({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return <div aria-hidden="true" className={`h-px w-full ${tone === "dark" ? "bg-night-4" : "bg-line-strong/70"} ${className}`} />;
}
