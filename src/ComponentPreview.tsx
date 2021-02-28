import { Stack } from "framer";
import { AnimateSharedLayout } from "framer-motion";
import React from "react";
import classes from "./ComponentPreview.module.css";

interface Props {
  Component: React.ComponentType<Record<string, unknown>>;
  props?: Record<string, unknown>[];
}

export function ComponentPreview({ Component, props }: Props) {
  const width =
    Component.defaultProps && Component.defaultProps.width
      ? (Component.defaultProps.width as number)
      : 300;
  const height =
    Component.defaultProps && Component.defaultProps.height
      ? (Component.defaultProps.height as number)
      : 200;
  const components = (props && props.length > 0 ? props : [{}]).map((p, i) => {
    return (
      <AnimateSharedLayout key={i}>
        <Component width={width} height={height} {...p} />
      </AnimateSharedLayout>
    );
  });
  const gap = 10;
  const totalHeight =
    height * components.length + gap * (components.length - 1);

  return (
    <div
      className={classes.componentWrapper}
      style={{
        width,
        height: totalHeight,
      }}
    >
      <Stack direction="vertical" gap={gap} width={width} height={totalHeight}>
        {components}
      </Stack>
    </div>
  );
}
