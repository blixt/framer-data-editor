import React, { useMemo } from "react";
import { Prop } from "./Prop";
import { Heading } from "./ui/Heading";
import { VStack } from "./ui/Stack";
import { Subtitle } from "./ui/Subtitle";

export interface PropertyControl {
  [key: string]: unknown;
  propName?: string;
  title?: string;
}

interface Props {
  onPropChange: (info: { name: string; expression: string }) => void;
  propertyControls?: Record<string, PropertyControl>;
}

export function ConnectProps({ onPropChange, propertyControls }: Props) {
  const props = useMemo(() => {
    if (!propertyControls) return null;
    return Object.entries(propertyControls).map(([name, prop]) => {
      const propName = prop.propName || name;
      const handleChange = (expression: string) => {
        onPropChange({ name: propName, expression });
      };
      return (
        <Prop
          key={propName}
          onChange={handleChange}
          name={propName}
          prop={prop}
        />
      );
    });
  }, [onPropChange, propertyControls]);
  if (!props) {
    return (
      <VStack>
        <Heading>Pick a component</Heading>
        <Subtitle>First, pick a component with property controls.</Subtitle>
      </VStack>
    );
  }
  return (
    <VStack>
      <Heading>Hook up the data</Heading>
      {props}
    </VStack>
  );
}
