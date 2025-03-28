import React from "react";
import { twMerge } from "tailwind-merge";
import { config as c } from "./config";
import { paddings } from "./config";
import { grid } from "./config";

type BoxProps = {
  children?: React.ReactNode | React.ReactNode[] | string | number;
  className?: string;
  style?: React.CSSProperties;
  outline?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  p?: number;
  gap?: number;
};

export default function Box({
  children,
  className,
  style,
  outline,
  shadow,
  rounded,
  p = 0,
  gap = 0,
}: BoxProps) {
  const outlineStyle = outline ? c.border : "";
  const shadowStyle = shadow ? c.shadow : "";
  const roundedStyle = rounded ? c.rounded : "";

  const classes = twMerge(
    `flex items-center justify-between ${outlineStyle} ${shadowStyle} ${c.rounded} ${paddings[p]} ${grid.gap[gap]}`,
    roundedStyle,
    className
  );
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
