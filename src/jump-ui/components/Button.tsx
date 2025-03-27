"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { config as c } from "./config";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  icon?: string | React.ReactNode | undefined;
};

export function Button({
  children,
  className,
  icon,
  style,
  ...props
}: ButtonProps) {
  const defaultStyles = `${c.bg} text-white ${c.height} dark:text-zinc-900 px-4 py-2 ${c.rounded} cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50 active:translate-y-[1px] flex items-center justify-center`;

  return (
    <button
      className={twMerge(defaultStyles, className)}
      style={style}
      {...props}
    >
      {icon && <span className="mr-4">{icon}</span>}
      {children}
    </button>
  );
}
