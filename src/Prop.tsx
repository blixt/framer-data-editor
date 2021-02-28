import React, { useCallback, useEffect, useRef, useState } from "react";
import { Field } from "./ui/Field";

export interface PropInfo {
  title?: string;
}

interface Props {
  onChange: (expression: string) => void;
  name: string;
  prop: PropInfo;
}

export function Prop({ onChange, name, prop }: Props) {
  const [expression, setExpression] = useState("");

  const handleChange = useCallback((event) => {
    setExpression(event.target.value);
  }, []);

  const defaultValue = `item.${name}`;
  const fillDefault = useCallback(() => {
    setExpression((e) => e || defaultValue);
  }, [defaultValue]);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useEffect(() => {
    onChangeRef.current?.(expression);
  }, [expression]);

  return (
    <Field label={prop.title || name}>
      <input
        onChange={handleChange}
        onDoubleClick={fillDefault}
        placeholder={defaultValue}
        value={expression}
      />
    </Field>
  );
}
