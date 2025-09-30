import * as React from "react";

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
};

export default function ServiceCard({ title, description, icon, href }: Props) {
  const Wrapper = href ? (props: any) => <a href={href} {...props} /> : (props: any) => <div {...props} />;
  return (
    <Wrapper className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="font-display text-xl">{title}</h3>
      {description && <p className="mt-2 text-sm text-foreground/70">{description}</p>}
      <span className="pointer-events-none absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary/20">→</span>
    </Wrapper>
  );
}
