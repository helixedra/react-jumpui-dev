import React, { useEffect, useRef } from "react";
import { Button } from "./Button";

type SelectProps = {
  children?: React.ReactNode | React.ReactNode[];
  placeholder?: string;
  value?: string;
  options?:
    | React.ReactNode[]
    | Array<{ children: React.ReactNode; value: string }>;
};

type Option = { props: { value: string; children: React.ReactNode } };

export function Select({ children, placeholder, value, options }: SelectProps) {
  const initialValue = "Select an option";
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(initialValue);
  const optionsArray = React.Children.toArray(children);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit" ref={selectRef}>
      <Button outline onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </Button>
      <div>
        {isOpen && (
          <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg w-auto z-10 text-nowrap">
            {optionsArray?.map((option: Option | any) => {
              return (
                <div
                  className="py-2 px-4 text-sm hover:bg-gray-200 cursor-pointer"
                  role="option"
                  aria-selected={selected === option?.props?.value}
                  aria-label={option?.props?.value}
                  tabIndex={0}
                  key={option?.props?.value}
                  onClick={() => {
                    setSelected(option?.props?.children as string);
                    setIsOpen(false);
                  }}
                >
                  {option?.props?.children}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

type OptionProps = {
  children: React.ReactNode;
  value: string;
};

export function Option({ children, value }: OptionProps) {
  return (
    <div>
      {value}:{children}
    </div>
  );
}
