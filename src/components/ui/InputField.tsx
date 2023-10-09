import React from "react";

import { MdClear } from "react-icons/md";
import { cn } from "@/utils";

export interface InputFieldProps extends React.ComponentProps<"input"> {
  isLoading: boolean;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  clearBtnProps?: React.HTMLAttributes<HTMLButtonElement>;
  handleClear?: () => void;
}

const InputField = (props: InputFieldProps) => {
  const {
    isLoading,
    containerProps,
    clearBtnProps,
    handleClear,
    ...inputProps
  } = props;
  return (
    <div
      {...containerProps}
      className={cn("relative h-[50px] w-full", containerProps?.className)}
    >
      <label htmlFor={inputProps.id} className="sr-only">
        {inputProps["aria-label"]}
      </label>
      <input disabled={isLoading} {...inputProps} />
      {handleClear && inputProps.value && !isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <button
            type="button"
            aria-label="Clear URL input"
            onClick={handleClear}
            {...clearBtnProps}
            className={cn(
              "flex items-center rounded bg-gray-500/80 p-2 text-white",
              clearBtnProps?.className
            )}
          >
            <MdClear className="text-xl" />
            <span className="text-sm font-light">Clear</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default InputField;
