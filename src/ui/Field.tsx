import React from "react";
import classes from "./Field.module.css";
import { HStack } from "./Stack";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  label: string;
}

export function Field({ children, label }: Props) {
  return (
    <HStack className={classes.field}>
      <strong>{label}</strong>
      {children}
    </HStack>
  );
}
