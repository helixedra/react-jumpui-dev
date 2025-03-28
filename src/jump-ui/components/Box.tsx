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
  items?: string;
  justify?: string;
  column?: boolean;
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
  items,
  justify,
  column,
}: BoxProps) {
  const flexItems = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    between: "items-between",
    around: "items-around",
    evenly: "items-evenly",
    stretch: "items-stretch",
  } as Record<string, string>;

  const flexJustify = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    stretch: "justify-stretch",
  } as Record<string, string>;

  const flexDirection = column ? "flex-col" : "flex-row";

  const flexItemsStyle = items ? flexItems[items] : "items-start";
  const flexJustifyStyle = justify ? flexJustify[justify] : "justify-start";

  const outlineStyle = outline ? c.border : "";
  const shadowStyle = shadow ? c.shadow : "";
  const roundedStyle = rounded ? c.rounded : "";

  const classes = twMerge(
    `flex items-center ${outlineStyle} ${shadowStyle} ${c.rounded} ${paddings[p]} ${grid.gap[gap]}`,
    flexItemsStyle,
    flexJustifyStyle,
    flexDirection,
    roundedStyle,
    className
  );
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
