import React from "react";
import { twMerge } from "tailwind-merge";
import { config as c } from "./config";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  icon?: string | React.ReactNode | undefined;
  iconEnd?: string | React.ReactNode | undefined;
};

export default function Input({
  className,
  icon,
  iconEnd,
  style,
  ...props
}: InputProps) {
  const defaultStyles = `bg-transparent px-4 border ${c.border} py-2 ${
    c.rounded
  } ${
    c.height
  } focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50 flex items-center justify-center ${
    icon && "pl-9"
  } ${iconEnd && "pr-9"} w-full`;

  return (
    <span className="relative">
      {icon && (
        <span className={`absolute left-3 top-0 flex items-center h-full`}>
          {icon}
        </span>
      )}
      <input
        className={twMerge(defaultStyles, className)}
        style={style}
        {...props}
      />
      {iconEnd && (
        <span className={`absolute top-0 right-3 flex items-center h-full`}>
          {iconEnd}
        </span>
      )}
    </span>
  );
}
