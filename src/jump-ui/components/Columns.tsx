import React from "react";
import { twMerge } from "tailwind-merge";
import { grid } from "./config";
import { config as c } from "./config";

type ColumnsProps = {
  children?: React.ReactNode | React.ReactNode[] | string | number;
  cols?: number;
  className?: string;
  style?: React.CSSProperties;
  outline?: boolean;
  rounded?: boolean;
};

export default function Columns({
  children,
  cols = 2,
  className,
  style,
  outline,
  rounded,
}: ColumnsProps) {
  const roundedStyle = rounded ? c.rounded : "";
  const outlineStyle = outline ? `${c.border} divide-x ${c.divide}` : "";

  const styles = twMerge(
    `grid`,
    grid.cols[cols],
    roundedStyle,
    outlineStyle,
    className
  );
  return (
    <div className={styles} style={style}>
      {children}
    </div>
  );
}
