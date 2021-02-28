import React, { useCallback, useMemo, useState } from "react";
import classes from "./App.module.css";
import { ComponentInfo, ComponentLoader } from "./ComponentLoader";
import { ComponentPreview } from "./ComponentPreview";
import { ConnectData, DataSource } from "./ConnectData";
import { ConnectProps } from "./ConnectProps";
import { ErrorBoundary } from "./ErrorBoundary";
import { CodeGen, ComponentGen } from "./framer/codegen";
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
    return generateSource(info, dataSource, propsMap);
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

function generateSource(
  info: ComponentInfo,
  dataSource: DataSource,
  propsMap: PropsMap
) {
  const gen = new CodeGen();
  gen.addImport("Stack", "framer");

  // Metadata about the new component we're creating.
  const component = new ComponentGen("DataComponent", "My Data Component");
  component.addAnnotation("framerIntrinsicWidth", 200);
  component.addAnnotation("framerIntrinsicHeight", 200);

  // Make it the default export.
  gen.addExport(component, "default");

  // The component which will be hooked up to the data.
  const importedComponentName = "Component";
  gen.addImport(info.exportSpecifier, info.importURL, importedComponentName);

  // The tag that we use to instantiate the imported component.
  const tagParts = [importedComponentName, "key={i}"];
  for (const name in propsMap) {
    tagParts.push(`${name}={${propsMap[name].expression}}`);
  }
  const tag = `<${tagParts.join(" ")} />`;

  // The code we want to run inside of the generated component.
  component.setBody(`
const [data, setData] = React.useState([])
React.useEffect(() => {
  let active = true;
  fetch(${JSON.stringify(dataSource.url)})
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
  return ${tag}
}), [data])
return (
  <Stack gap={10} direction="vertical" width="100%" height="100%">{instances}</Stack>
)
`);

  return gen.build();
}
