import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "./Button";
import { config as c } from "./config";
import { twMerge } from "tailwind-merge";
import { RiCheckLine, RiArrowDropDownLine } from "react-icons/ri";

type SelectProps = {
  children?: React.ReactNode | React.ReactNode[];
  placeholder?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
};

type Option = { props: { value: string; children: React.ReactNode } } | any;

type OptionProps = {
  children: React.ReactNode;
  value: string;
};

const selectArrowClasses = `transition-transform duration-200 ease-in-out opacity-50 -mr-2`;

export function Select({
  children,
  placeholder,
  value,
  className,
  style,
}: SelectProps) {
  const computedInitialValue = React.useMemo(() => {
    const options = React.Children.toArray(children) as Option[];

    const foundOption = options.find((option): Option | null => {
      return option.props?.value === value ? option : null;
    });

    return foundOption;
  }, [value]);

  const initialValue = computedInitialValue || {
    value: null,
    children: placeholder ? placeholder : `Select an option`,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});
  const optionsArray = React.Children.toArray(children);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        zIndex: 1000,
      });
    }
  }, [isOpen]);

  const listClasses = twMerge(
    `mt-1 py-2 w-full z-10 ${c.border} ${c.listBg} shadow-lg ${c.rounded} ${c.focus} ${c.divide} transition-transform transition-opacity duration-200 ease-in-out opacity-100 ${c.shadow}`,
    className
  );

  const dropdown = (
    <div
      ref={dropdownRef}
      style={dropdownStyles}
      className={
        isOpen
          ? listClasses
          : "absolute invisible transform -translate-y-2 opacity-0"
      }
    >
      {optionsArray?.map((option: Option | any) => {
        return (
          <div
            className={`py-2 ${c.listHover} px-4 text-sm cursor-pointer flex-nowrap flex items-center justify-between whitespace-nowrap`}
            role="option"
            aria-selected={selected === option?.props?.value}
            aria-label={option?.props?.value}
            tabIndex={0}
            key={option?.props?.value}
            onClick={() => {
              setSelected({
                value: option?.props?.value,
                children: option?.props?.children,
              });
              setIsOpen(false);
            }}
          >
            <span className="truncate">{option?.props?.children}</span>
            {selected.value === option?.props?.value && (
              <div className="w-4 h-4 ml-4">
                <RiCheckLine size={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative" ref={selectRef}>
      <Button
        className={`${className}`}
        style={style}
        iconEnd={
          <RiArrowDropDownLine
            size={24}
            className={
              isOpen
                ? `${selectArrowClasses} rotate-180`
                : `${selectArrowClasses} rotate-0`
            }
          />
        }
        outline
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selected.children}</span>
      </Button>
      {isOpen &&
        ReactDOM.createPortal(
          dropdown,
          document.body // Render the dropdown in the body
        )}
    </div>
  );
}

export function Option({ children, value }: OptionProps) {
  return (
    <div>
      {value}:{children}
    </div>
  );
}
