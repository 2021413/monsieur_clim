import * as React from "react";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  kicker?: string;
};

export default function Heading({ level = 1, kicker, className, children, ...props }: Props) {
  const Tag = `h${level}` as const;
  const sizes: Record<number, string> = {
    1: "text-4xl sm:text-5xl font-extrabold",
    2: "text-3xl sm:text-4xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };
  return (
    <div>
      {kicker && <p className="mb-2 font-sans text-xs uppercase tracking-widest text-muted">{kicker}</p>}
      <Tag className={clsx("font-display leading-tight", sizes[level], className)} {...props}>
        {children}
      </Tag>
    </div>
  );
}
