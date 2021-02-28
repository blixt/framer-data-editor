import React from "react";
import classes from "./Heading.module.css";

interface Props {
  children: string;
}

export function Heading({ children }: Props) {
  return <div className={classes.heading}>{children}</div>;
}
