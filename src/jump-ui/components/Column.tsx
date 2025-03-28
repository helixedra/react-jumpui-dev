import React from "react";
import { twMerge } from "tailwind-merge";
import { paddings } from "./config";
import { config as c } from "./config";

type ColumnProps = {
  children?: React.ReactNode | React.ReactNode[] | string | number;
  p?: number;
  className?: string;
  outline?: boolean;
  rounded?: boolean;
  style?: React.CSSProperties;
};

export default function Column({
  children,
  p = 4,
  className,
  style,
  outline,
  rounded,
}: ColumnProps) {
  const roundedStyle = rounded ? c.rounded : "";
  const outlineStyle = outline ? `${c.border} divide-x ${c.divide}` : "";
  const styles = twMerge(paddings[p], roundedStyle, outlineStyle, className);

  return (
    <div className={styles} style={style}>
      {children}
    </div>
  );
}
