export class CodeGen {
  #exports: { exportable: Exportable; alias?: string }[] = [];
  #imports = [`import * as React from "react";`];

  constructor() {}

  addExport(exportable: Exportable, alias?: string) {
    this.#exports.push({ exportable, alias });
  }

  addImport(importName: string, importSpecifier: string, alias?: string) {
    if (!alias) {
      if (importName === "default") {
        throw Error("Alias must be specified for default imports");
      }
      alias = importName;
    }
    const importBinding =
      importName === "default"
        ? alias
        : alias === importName
        ? `{ ${importName} }`
        : `{ ${importName} as ${alias} }`;
    this.#imports.push(
      `import ${importBinding} from ${JSON.stringify(importSpecifier)};`
    );
  }

  build() {
    return [...this.#imports, "", ...this.buildExports()].join("\n");
  }

  private buildExports() {
    return [
      this.#exports
        .map(({ exportable, alias }) => exportable.build(alias))
        .join("\n\n"),
    ];
  }
}

interface Exportable {
  build(alias?: string): string;
}

export class ComponentGen implements Exportable {
  #body = "";
  #displayName: string | undefined;
  #jsDoc: string[] = [];
  #name: string;

  constructor(name: string, displayName?: string) {
    this.#name = name;
    this.#displayName = displayName;
  }

  addAnnotation(name: string, value: boolean | number | string) {
    this.#jsDoc.push(`@${name} ${value}`);
  }

  build(alias?: string) {
    return [
      ...this.buildJSDoc(),
      `${alias ? "function" : "export function"} ${this.#name}() {`,
      ...this.buildBody(),
      "}",
      ...this.buildDisplayName(),
      ...this.buildExportAlias(alias),
    ].join("\n");
  }

  setBody(body: string) {
    this.#body = body.trim();
  }

  private buildBody() {
    if (!this.#body) return [];
    return this.#body.split("\n").map((line) => `  ${line}`);
  }

  private buildDisplayName() {
    return this.#displayName
      ? [
          "",
          `${this.#name}.displayName = ${JSON.stringify(this.#displayName)};`,
        ]
      : [];
  }

  private buildExportAlias(alias: string | undefined) {
    if (!alias) return [];
    if (alias === this.#name) {
      return ["", `export ${this.#name};`];
    } else if (alias === "default") {
      return ["", `export default ${this.#name};`];
    } else {
      return ["", `export { ${this.#name} as ${alias} };`];
    }
  }

  private buildJSDoc() {
    if (this.#jsDoc.length === 0) return [];
    return ["/**", ...this.#jsDoc.map((line) => ` * ${line}`), " */"];
  }
}
