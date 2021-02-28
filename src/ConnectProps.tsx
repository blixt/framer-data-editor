import React, { useMemo } from "react";
import { Prop } from "./Prop";
import { VStack } from "./ui/Stack";
import { Subtitle } from "./ui/Subtitle";
import { Title } from "./ui/Title";

interface Props {
  onPropChange: (info: { name: string; expression: string }) => void;
  variableProps?: string[];
}

export function ConnectProps({ onPropChange, variableProps }: Props) {
  const props = useMemo(() => {
    if (!variableProps) return null;
    return variableProps.map((name) => {
      const handleChange = (expression: string) => {
        onPropChange({ name, expression });
      };
      return <Prop key={name} onChange={handleChange} name={name} />;
    });
  }, [onPropChange, variableProps]);
  if (!props) {
    return (
      <VStack>
        <Title>Pick a component</Title>
        <Subtitle>First, pick a component with property controls.</Subtitle>
      </VStack>
    );
  }
  return (
    <VStack>
      <Title>Hook up the data</Title>
      {props}
    </VStack>
  );
}
