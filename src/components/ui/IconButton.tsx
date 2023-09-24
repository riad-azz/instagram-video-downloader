import React from "react";

export interface IconButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}
const IconButton = (props: IconButtonProps) => {
  const { children, ...buttonProps } = props;
  return <button {...buttonProps}>{children}</button>;
};

export default IconButton;
