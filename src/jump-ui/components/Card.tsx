import React from "react";
import { twMerge } from "tailwind-merge";
import { paddings } from "./config";
import { config as c } from "./config";

type CardProps = {
  children?: React.ReactNode | React.ReactNode[] | string | number;
  className?: string;
  style?: React.CSSProperties;
  outline?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  bg?: boolean;
  p?: number;
};

export default function Card({
  children,
  className,
  style,
  outline,
  shadow,
  rounded = true,
  bg = true,
  p = 4,
}: CardProps) {
  const bgStyle = bg
    ? "bg-white dark:bg-zinc-800"
    : "bg-transparent dark:bg-transparent";
  const outlineStyle = outline ? `${c.border}` : "";
  const shadowStyle = shadow ? c.shadow : "";
  const roundedStyle = rounded ? c.rounded : "";

  const initialClasses = `${bgStyle} w-fit h-fit ${outlineStyle} ${shadowStyle} ${roundedStyle} ${paddings[p]}`;
  const classes = twMerge(initialClasses, className);

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
