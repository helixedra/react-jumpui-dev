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
  const initialClasses = `text-white ${
    c.height
  } dark:text-zinc-900 text-sm px-4 py-2 ${
    c.rounded
  } cursor-pointer hover:opacity-90 ${
    c.focus
  } active:translate-y-[1px] flex items-center ${
    iconEnd ? `justify-between` : `justify-center`
  } `;

  const bgStyle = outline ? c.outlineButtonBg : c.bg;

  const outlineStyle = outline
    ? `${c.outlineButtonBorder} text-zinc-900 dark:text-white`
    : "";

  const iconButtonStyle = iconButton ? `${c.height} ${c.width} p-0` : "";

  return (
    <button
      className={twMerge(
        initialClasses,
        iconButtonStyle,
        outlineStyle,
        bgStyle,
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
