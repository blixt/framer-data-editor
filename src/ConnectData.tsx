import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Field } from "./ui/Field";
import { VStack } from "./ui/Stack";
import { Subtitle } from "./ui/Subtitle";
import { Title } from "./ui/Title";

export interface DataSource {
  url: string;
  expression: string;
  root: unknown[];
}

interface Props {
  onDataSource: (info: DataSource | null) => void;
}

export function ConnectData({ onDataSource }: Props) {
  const [url, setURL] = useState("");
  const [expression, setExpression] = useState("root");

  const handleChangeURL = useCallback((event) => {
    setURL(event.target.value);
  }, []);

  const [data, setData] = useState(null);
  useEffect(() => {
    try {
      const parsedURL = new URL(url);
      if (parsedURL.protocol !== "https:") return;
    } catch {
      return;
    }
    let active = true;
    fetch(url)
      .then((r) => r.json())
      .then((newData) => {
        if (!active) return;
        setData(newData);
      })
      .catch((error) => {
        if (!active) return;
        console.warn("Could not get data:", error);
        setData(null);
      });
    return () => {
      active = false;
    };
  }, [url]);

  const value = useMemo(() => {
    if (!data) return null;
    try {
      const value = new Function("root", `return ${expression}`)(data);
      if (Array.isArray(value)) {
        return value;
      } else {
        console.warn("Value is not array:", value);
        return null;
      }
    } catch (error) {
      console.warn("Could not extract value:", error.message);
      return null;
    }
  }, [data, expression]);

  const onInfoRef = useRef(onDataSource);
  onInfoRef.current = onDataSource;
  useEffect(() => {
    onInfoRef.current?.(value ? { url, expression, root: value } : null);
  }, [value]);

  const handleChangeExpression = useCallback((event) => {
    setExpression(event.target.value);
  }, []);

  const exampleURL = "https://www.spaceflightnewsapi.net/api/v2/articles";
  return (
    <VStack>
      <Title>Find some data</Title>
      <Field label="JSON URL">
        <input
          placeholder="https://…"
          onChange={handleChangeURL}
          onDoubleClick={() => setURL(exampleURL)}
          value={url}
        />
      </Field>
      <Field label="Expression">
        <input
          placeholder="root.someArray"
          onChange={handleChangeExpression}
          value={expression}
        />
      </Field>
      <Subtitle>
        Pick an array value in the <code>root</code> variable.
      </Subtitle>
    </VStack>
  );
}
