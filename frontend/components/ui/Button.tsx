"use client";
import * as React from "react";
import clsx from "clsx";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "outline";

type BaseProps = {
  variant?: Variant;
  full?: boolean;
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type LinkProps = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

type Props = ButtonProps | LinkProps;

export default function Button({
  className,
  variant = "primary",
  full,
  href,
  children,
  ...props
}: Props) {
  const base = "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-white hover:brightness-110 focus-visible:ring-primary",
    secondary:
      "bg-secondary text-white hover:brightness-110 focus-visible:ring-secondary",
    ghost:
      "bg-transparent text-foreground hover:bg-black/5 focus-visible:ring-foreground",
    outline:
      "border border-foreground/20 text-foreground hover:bg-black/5 focus-visible:ring-foreground",
  };

  const classes = clsx(base, variants[variant], full && "w-full", className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
