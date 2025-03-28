"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { config as c } from "./config";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  icon?: string | React.ReactNode;
  iconEnd?: string | React.ReactNode;
  outline?: boolean;
  iconButton?: boolean;
};

export function Button({
  children,
  className,
  outline,
  icon,
  iconEnd,
  style,
  iconButton,
  ...props
}: ButtonProps) {
  const initialClasses = `${c.bg} text-white ${c.height} dark:text-zinc-900 text-sm px-4 py-2 ${c.rounded} cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50 active:translate-y-[1px] flex items-center justify-center`;

  const outlineStyle =
    outline && `${c.outline} bg-transparent text-zinc-900 dark:text-white`;

  const iconButtonStyle = iconButton ? `${c.height} ${c.width} p-0` : "";

  return (
    <button
      className={twMerge(
        initialClasses,
        outlineStyle,
        iconButtonStyle,
        className
      )}
      style={style}
      {...props}
    >
      {icon && <span className="mr-4">{icon}</span>}
      {children}
      {iconEnd && <span className="ml-4">{iconEnd}</span>}
    </button>
  );
}
