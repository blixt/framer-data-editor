import React from "react";
import classes from "./Stack.module.css";

interface StackProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export function HStack({ children, className }: StackProps) {
  return (
    <div className={classes.hStack + (className ? " " + className : "")}>
      {children}
    </div>
  );
}

export function VStack({ children, className }: StackProps) {
  return (
    <div className={classes.vStack + (className ? " " + className : "")}>
      {children}
    </div>
  );
}

export function Spacer() {
  return <div className={classes.spacer}></div>;
}
