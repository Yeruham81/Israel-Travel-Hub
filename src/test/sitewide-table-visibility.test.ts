import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import * as ts from "typescript";

/** Guard every JSX table, including tables in shared guide templates.
 * Keep it independent of a manually maintained list of page URLs.
 */
const root = resolve(process.cwd(), "src");
const hiddenAtBreakpoint =
  /(?:^|[\s"'`])(?:hidden|(?:sm|md|lg|xl|2xl):hidden|(?:sm|md|lg|xl|2xl):table)(?=$|[\s"'`])/;
const scrollableAtBreakpoint = /\boverflow-(?:x-)?(?:auto|scroll)\b/;

function allSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return allSourceFiles(path);
    return entry.isFile() && path.endsWith(".tsx") && !/\.test\.tsx$/.test(path) ? [path] : [];
  });
}

function classNameText(
  element: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
  source: ts.SourceFile,
): string {
  const attribute = element.attributes.properties.find(
    (value) => ts.isJsxAttribute(value) && value.name.getText(source) === "className",
  );
  return attribute && ts.isJsxAttribute(attribute)
    ? (attribute.initializer?.getText(source) ?? "")
    : "";
}

describe("all-site desktop and mobile table parity", () => {
  it("keeps every rendered JSX table visible on all breakpoints with an overflow container", () => {
    const audit: string[] = [];
    const errors: string[] = [];

    for (const filename of allSourceFiles(root)) {
      const input = readFileSync(filename, "utf8");
      const file = ts.createSourceFile(
        filename,
        input,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      const page = relative(process.cwd(), filename);

      function visit(node: ts.Node) {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tag = node.tagName.getText(file);
          if (tag === "table" || tag === "Table") {
            const location = file.getLineAndCharacterOfPosition(node.getStart(file));
            const where = page + ":" + (location.line + 1);
            audit.push(where);
            let scrollable = false;

            // Includes the table itself and every real JSX ancestor. A parent
            // hidden until md/lg can make an otherwise visible table mobile-only.
            const chain: string[] = [classNameText(node, file)];
            for (let parent: ts.Node | undefined = node.parent; parent; parent = parent.parent) {
              if (ts.isJsxElement(parent)) chain.push(classNameText(parent.openingElement, file));
            }
            for (const classes of chain) {
              if (hiddenAtBreakpoint.test(classes))
                errors.push(where + " has responsive visibility classes: " + classes.slice(0, 140));
              if (scrollableAtBreakpoint.test(classes)) scrollable = true;
            }
            if (!scrollable) errors.push(where + " has no horizontally scrollable JSX wrapper");
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(file);
    }

    expect(
      audit.length,
      "All existing table templates should remain in the site",
    ).toBeGreaterThanOrEqual(30);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  it("does not hide HTML tables through global responsive CSS", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");
    expect(css).not.toMatch(
      /(?:table|thead|tbody|tr)\b[^{]*\{[^}]*\b(?:display\s*:\s*none|visibility\s*:\s*hidden)\s*;?/i,
    );
  });
});
