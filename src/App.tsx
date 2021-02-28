import React, { useCallback, useMemo, useState } from "react";
import classes from "./App.module.css";
import { ComponentInfo, ComponentLoader } from "./ComponentLoader";
import { ComponentPreview } from "./ComponentPreview";
import { ConnectData, DataSource } from "./ConnectData";
import { ConnectProps } from "./ConnectProps";
import { ErrorBoundary } from "./ErrorBoundary";
import { Button } from "./ui/Button";

interface PropsMap {
  [name: string]: { expression: string; extractFn: (item: unknown) => unknown };
}

export function App() {
  const [info, setInfo] = useState<ComponentInfo | null>(null);
  const [dataSource, setDataSource] = useState<DataSource | null>(null);

  const [propsMap, setPropsMap] = useState<PropsMap>({});
  const handlePropChange = useCallback(({ name, expression }) => {
    if (!expression) {
      setPropsMap((prev) => {
        const { [name]: _, ...next } = prev;
        return next;
      });
      return;
    }
    try {
      const extractFn = new Function("item", `return ${expression}`);
      setPropsMap((prev) => ({ ...prev, [name]: { expression, extractFn } }));
    } catch (error) {
      console.warn(
        `Could not use item expression "${expression}":`,
        error.message
      );
    }
  }, []);

  const props = useMemo(() => {
    if (!dataSource?.root) return;
    return dataSource.root.map((item) => {
      const itemProps: Record<string, unknown> = {};
      for (const propName in propsMap) {
        try {
          itemProps[propName] = propsMap[propName].extractFn(item);
        } catch (error) {
          console.warn(
            `Failed to extract item props for ${propName}:`,
            error.message
          );
        }
      }
      return itemProps;
    });
  }, [propsMap, dataSource]);

  const source = useMemo(() => {
    if (!info || !dataSource) return "";
    const attrs = [];
    for (const name in propsMap) {
      attrs.push(`${name}={${propsMap[name].expression}}`);
    }
    const importBinding =
      info.exportSpecifier === "default"
        ? "Component"
        : info.exportSpecifier === "Component"
        ? `{ ${info.exportSpecifier} }`
        : `{ ${info.exportSpecifier} as Component }`;
    return `
import * as React from "react";
import { Stack } from "framer";
import ${importBinding} from "${info.importURL}";

/**
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 200
 */
function DataComponent() {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    let active = true;
    fetch("${dataSource.url}")
      .then(r => r.json())
      .then(root => {
        if (!active) return
        setData(${dataSource.expression})
      })
    return () => {
      active = false;
    }
  }, [])
  const instances = React.useMemo(() => data.map((item, i) => {
    return <Component key={i} ${attrs.join(" ")} />
  }), [data])
  return (
    <Stack gap={10} direction="vertical" width="100%" height="100%">{instances}</Stack>
  )
}

DataComponent.displayName = "My Data Component";

export default DataComponent;
    `;
  }, [dataSource, info, propsMap]);

  const handleSave = useCallback(() => {
    if (!source) return;
    window.parent?.postMessage(
      JSON.stringify({ type: "updateSource", source }),
      "*"
    );
  }, [source]);

  return (
    <div className={classes.app}>
      <div className={`${classes.preview} ${classes.helper}`}>
        <ErrorBoundary>
          {info ? (
            <ComponentPreview Component={info.component} props={props} />
          ) : (
            <ComponentLoader onComponent={setInfo} />
          )}
        </ErrorBoundary>
      </div>
      <div className={classes.column}>
        <div className={classes.config}>
          <ConnectData onDataSource={setDataSource} />
          <ConnectProps
            variableProps={info?.variableProps}
            onPropChange={handlePropChange}
          />
        </div>
        <Button onClick={handleSave} primary text="Save" />
      </div>
    </div>
  );
}
