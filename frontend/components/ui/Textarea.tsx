"use client";
import * as React from "react";
import clsx from "clsx";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className, rows = 4, ...props }: Props) {
  return (
    <div className="relative">
      <textarea
        rows={rows}
        className={clsx(
          "w-full rounded-xl border-0 bg-gradient-to-r from-slate-700/90 to-slate-800/95 backdrop-blur-sm px-4 py-3.5 text-sm text-foreground placeholder:text-muted/70 shadow-inner transition-all duration-200 focus:ring-2 focus:ring-primary/30 hover:from-slate-700/92 hover:to-slate-800/96 resize-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
