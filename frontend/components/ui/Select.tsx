"use client";
import * as React from "react";
import clsx from "clsx";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className, children, ...props }: Props) {
  return (
    <div className="relative">
      <select
        className={clsx(
          "w-full appearance-none rounded-lg sm:rounded-xl border-0 bg-gradient-to-r from-slate-700/90 to-slate-800/95 backdrop-blur-sm px-3 sm:px-4 py-3 sm:py-3.5 pr-9 sm:pr-10 text-sm text-foreground shadow-inner transition-all duration-200 focus:ring-2 focus:ring-primary/30 hover:from-slate-700/92 hover:to-slate-800/96 cursor-pointer [&>option]:bg-slate-800 [&>option]:text-foreground [&>option]:py-2",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {/* Icône de flèche personnalisée */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}
