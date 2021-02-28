import React from "react";

interface FramerAnnotations {
  framerIntrinsicHeight?: string;
  framerIntrinsicWidth?: string;
  framerPreviewPlugin?: string;
  framervariables?: string;
  framerVariables?: string;
}

type FramerMetadataExport =
  | {
      type: "reactComponent";
      slots: string[];
      annotations: FramerAnnotations;
    }
  | { type: "class" }
  | { type: "function" }
  | { type: "variable" }
  | { type: "tsType" };

interface FramerMetadata {
  exports: Record<string, FramerMetadataExport>;
}

interface FramerModule extends Record<string, unknown> {
  __FramerMetadata__?: FramerMetadata;
}

export interface ComponentMetadata {
  component: React.ComponentType<Record<string, unknown>>;
  exportSpecifier: string;
  variableProps: string[];
}

export function extractComponents(module: FramerModule): ComponentMetadata[] {
  if (!module.__FramerMetadata__) return [];
  const components: ComponentMetadata[] = [];
  Object.entries(module.__FramerMetadata__.exports).forEach(
    ([exportSpecifier, info]) => {
      console.log(exportSpecifier, info);
      if (info.type !== "reactComponent") return;
      const variableProps = extractVariablePropNames(info.annotations);
      const component = module[exportSpecifier] as React.ComponentType<
        Record<string, unknown>
      >;
      components.push({ component, exportSpecifier, variableProps });
    }
  );
  return components;
}

function extractVariablePropNames(annotations: FramerAnnotations): string[] {
  const variablesJSON =
    annotations.framerVariables || annotations.framervariables;
  if (!variablesJSON) return [];
  const variableProps: string[] = [];
  const variables = JSON.parse(variablesJSON) as Record<string, string>;
  for (const name in variables) {
    const propName = variables[name];
    if (typeof propName === "string") {
      variableProps.push(propName);
    }
  }
  return variableProps;
}
