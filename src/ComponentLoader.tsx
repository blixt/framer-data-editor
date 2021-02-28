import React, { useCallback, useState } from "react";
import { PropertyControl } from "./ConnectProps";
import { patchGlobals } from "./patchGlobals";
import { Button } from "./ui/Button";
import { HStack } from "./ui/Stack";

// Make sure that the imported module can use React and Framer globals.
patchGlobals();

type FramerComponent = React.ComponentType<Record<string, unknown>> & {
  propertyControls?: Record<string, PropertyControl>;
};

export interface ComponentInfo {
  Component: FramerComponent;
  importURL: string;
  identifier: string;
}

interface Props {
  onComponent: (info: ComponentInfo) => void;
}

export function ComponentLoader({ onComponent }: Props) {
  const [url, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = useCallback((e) => setURL(e.target.value), []);
  const handleSubmit = useCallback(() => {
    setIsLoading(true);
    import(/* @vite-ignore */ url)
      .then((module) => {
        // For now, just return the first exported name starting with an upper case letter.
        const key =
          Object.keys(module).find((k) => k.match(/^[A-Z]/)) || "default";
        onComponent({
          Component: module[key],
          importURL: url,
          identifier: key,
        });
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  }, [onComponent, url]);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === "Return") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );
  const exampleURL = "https://framer.com/m/News-Article-j4Jp.js";
  return (
    <HStack>
      <input
        disabled={isLoading}
        onChange={handleChange}
        onDoubleClick={() => setURL(exampleURL)}
        onKeyDown={handleKeyDown}
        placeholder="https://…"
        value={url}
      />
      <Button disabled={isLoading} onClick={handleSubmit} primary text="Go" />
    </HStack>
  );
}
