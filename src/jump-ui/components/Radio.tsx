import React, { createContext, useContext, useState, ReactNode } from "react";

interface RadioGroupContextType {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled: boolean;
  required: boolean;
  descriptionId?: string;
  errorId?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined
);

export interface RadioProps {
  id?: string;
  label: string;
  value: string;
  disabled?: boolean;
  className?: string;
}

function Radio({
  id,
  label,
  value,
  disabled = false,
  className = "",
}: RadioProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("Radio must be used within a RadioGroup");
  }

  const {
    name,
    value: groupValue,
    onChange,
    disabled: groupDisabled,
    required,
    descriptionId,
    errorId,
  } = context;

  const isDisabled = disabled || groupDisabled;
  const checked = groupValue === value;
  const radioId = id || `radio-${value}`;
  const ariaDescribedby =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={() => onChange(value)}
          className="absolute w-5 h-5 opacity-0 cursor-pointer"
          aria-describedby={ariaDescribedby}
          aria-disabled={isDisabled}
          aria-checked={checked}
          required={required}
        />
        <div
          className={`h-5 w-5 rounded-full transition-all duration-200 ${
            isDisabled
              ? "border-black border opacity-30 bg-gray-200"
              : checked
              ? "bg-black border-black border"
              : "border-gray-300 border"
          } flex items-center justify-center pointer-events-none`}
        >
          {checked && (
            <div
              className={`h-1.5 w-1.5 rounded-full transition-transform duration-200 ${
                isDisabled ? "bg-gray-400" : "bg-white"
              }`}
            ></div>
          )}
        </div>
      </div>
      <label
        htmlFor={radioId}
        className={`ml-2 text-sm font-medium ${
          isDisabled
            ? "text-zinc-400 cursor-not-allowed"
            : "text-zinc-700 cursor-pointer"
        }`}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
    </div>
  );
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
  legend?: string;
  description?: string;
  required?: boolean;
  errorMessage?: string;
  children: ReactNode;
}

function RadioGroup({
  name,
  value,
  onChange,
  disabled = false,
  className = "",
  orientation = "vertical",
  legend,
  description,
  required = false,
  errorMessage,
  children,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(value);

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const groupId = React.useId();
  const descriptionId = description ? `${groupId}-desc` : undefined;
  const errorId = errorMessage ? `${groupId}-error` : undefined;

  const currentValue = value !== undefined ? value : internalValue;

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: currentValue,
        onChange: handleChange,
        disabled,
        required,
        descriptionId,
        errorId,
      }}
    >
      <fieldset
        className={`${className}`}
        aria-required={required}
        aria-describedby={`${descriptionId ? descriptionId : ""} ${
          errorId ? errorId : ""
        }`}
        aria-invalid={!!errorMessage}
      >
        {legend && (
          <legend className="text-base font-medium mb-2">
            {legend}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </legend>
        )}

        {description && (
          <div id={descriptionId} className="text-sm mb-2">
            {description}
          </div>
        )}

        <div
          className={`${
            orientation === "vertical"
              ? "flex flex-col space-y-2"
              : "flex flex-row space-x-4"
          }`}
          role="radiogroup"
        >
          {children}
        </div>

        {errorMessage && (
          <div id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {errorMessage}
          </div>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

export default Object.assign(Radio, {
  Group: RadioGroup,
});
