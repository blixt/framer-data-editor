import React from "react";
import classes from "./Title.module.css";

interface Props {
  children: string;
}

export function Title({ children }: Props) {
  return <div className={classes.title}>{children}</div>;
}
