import React from "react";
import classes from "./Subtitle.module.css";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export function Subtitle({ children }: Props) {
  return <div className={classes.subtitle}>{children}</div>;
}
