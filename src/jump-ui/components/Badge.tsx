import React from "react";
import { twMerge } from "tailwind-merge";
import { config as c } from "./config";

type BadgeProps = {
  children?: React.ReactNode | string;
  className?: string;
  color?: string;
  rounded?: boolean;
  outline?: string;
  dot?: string;
  bg?: string;
  style?: React.CSSProperties;
  text?: string;
  fill?: boolean;
};

export function Badge({
  children,
  className,
  style,
  bg,
  rounded = true,
  outline,
  dot,
  text,
  fill,
}: BadgeProps) {
  const bgStyles = bg ? bg : "";
  const dotStyles = dot ? dot : "";
  const textStyles = text ? text : "";
  const roundedStyles = rounded ? c.rounded : "";
  const outlineStyles = outline ? `border border-${outline}` : "";
  const InitialStyles = `flex items-center w-fit px-2 py-1 text-xs font-semibold ${text} relative`;
  const classes = twMerge(InitialStyles, outlineStyles, textStyles, className);

  const dotClasses = twMerge(
    dotStyles,
    `w-2 h-2 rounded-full inline-block mr-1`,
    dot
  );

  const bgClasses = twMerge(
    bgStyles,
    `w-full h-full absolute ${!fill && "opacity-20"} left-0 top-0 ${
      fill && "-z-1"
    }`,
    roundedStyles
  );

  return (
    <span className={classes} style={style}>
      <span className={bgClasses}></span>
      {dot && <span className={dotClasses}></span>}
      {children}
    </span>
  );
}
