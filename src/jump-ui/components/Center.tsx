import React from "react";

type CenterProps = {
  children?: React.ReactNode | React.ReactNode[] | string | number;
};

export default function Center({ children }: CenterProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
}
