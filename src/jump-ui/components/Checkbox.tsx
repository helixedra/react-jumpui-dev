"use client";
import { useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { config as c } from "./config";

export function Checkbox({
  className,
  ...props
}: {
  className?: string;
  [key: string]: string | boolean | undefined;
}) {
  const [checked, setChecked] = useState(false);

  const defaultStyles = `flex items-center justify-center cursor-pointer h-[1.5rem] w-[1.5rem] ${
    c.rounded
  } ${c.border} ${c.focus} ${checked ? c.bg : "bg-transparent"}`;

  return (
    <label className={twMerge(defaultStyles, className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="hidden"
        {...props}
      />
      {checked ? <RiCheckLine className="invert" /> : null}
    </label>
  );
}
