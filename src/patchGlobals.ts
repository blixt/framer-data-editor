import * as Framer from "framer";
import React from "react";

interface WindowWithFramerGlobals extends Window {
  React?: typeof React;
  Framer?: typeof Framer;
}

/** Makes React and Framer globals available to the Framer component. */
export function patchGlobals() {
  const windowToPatch = window as WindowWithFramerGlobals;
  windowToPatch.React = React;
  windowToPatch.Framer = Framer;
}
