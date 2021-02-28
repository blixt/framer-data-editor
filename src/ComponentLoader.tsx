import React, { useCallback, useState } from "react";
import { extractComponents } from "./framer/module";
import { patchGlobals } from "./patchGlobals";
import { Button } from "./ui/Button";
import { HStack } from "./ui/Stack";

// Make sure that the imported module can use React and Framer globals.
patchGlobals();

export interface ComponentInfo {
  importURL: string;
  component: React.ComponentType<Record<string, unknown>>;
  exportSpecifier: string;
  variableProps: string[];
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
        const components = extractComponents(module);
        // For now, just return the first component found (if any).
        if (components.length === 0) {
          throw Error("Module did not contain any components");
        }
        onComponent({ ...components[0], importURL: url });
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
