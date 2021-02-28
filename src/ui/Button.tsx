import React from "react";
import classes from "./Button.module.css";

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  primary?: boolean;
  text: string;
}

export function Button({
  disabled,
  text = "Click Me",
  primary = false,
  onClick,
}: Props) {
  return (
    <div
      className={classes.button + (primary && " " + classes.primary)}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </div>
  );
}
