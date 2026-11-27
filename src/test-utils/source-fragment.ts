/**
 * Match a source fragment without depending on Prettier's line wrapping.
 * Quoted literals, identifiers, operators and punctuation remain exact.
 * Only lexical spacing and optional formatter-added arrow/JSX parentheses
 * are flexible. This helper is for source-code assertions, not data values.
 */
const escapeRegExp = (value: string) => value.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&");
const visibleSpace = '(?:\\s|\\{\\s*" "\\s*\\})';
const codeSpace = "\\s*";

export function sourceFragment(fragment: string): RegExp {
  if (!fragment) return /(?:)/;
  const isCode = /[<>{}=]|=>|\b[\w$]+:\s*["'\d]|\b[\w$]+\.[\w$]+\(|\b(?:const|return)\s/.test(fragment);
  if (!isCode) {
    return new RegExp(fragment.split(/(\s+)/).map(part => /^\s+$/.test(part) ? visibleSpace + "+" : escapeRegExp(part)).join(""));
  }

  // Quoted strings are atomic: do not permit changes to literal URLs,
  // CSS class names, text, identifiers or property values.
  const tokens = fragment.match(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|===|!==|=>|&&|\|\||\?\?|==|!=|<=|>=|\?\.|\.\.\.|[\p{L}\p{N}_$]+|\s+|./gsu) ?? [];
  const items: Array<{token: string; before: boolean; pattern?: string}> = [];
  let space = false;
  for (const token of tokens) {
    if (/^\s+$/.test(token)) { space = true; continue; }
    items.push({token, before: space});
    space = false;
  }
  const identifier = /^[\p{L}_$][\p{L}\p{N}_$]*$/u;
  // A single, untyped arrow parameter may be printed with or without parens.
  for (let i = 0; i < items.length; i++) {
    const a = items[i];
    if (!a) continue;
    if (a.token === "(" && identifier.test(items[i+1]?.token ?? "") &&
        items[i+2]?.token === ")" && items[i+3]?.token === "=>") {
      const name = items[i+1]!.token;
      items.splice(i, 3, {token: name, before: a.before, pattern: "(?:" + escapeRegExp(name) + "|\\(\\s*" + escapeRegExp(name) + "\\s*\\))"});
    } else if (identifier.test(a.token) && items[i+1]?.token === "=>") {
      a.pattern = "(?:" + escapeRegExp(a.token) + "|\\(\\s*" + escapeRegExp(a.token) + "\\s*\\))";
    }
  }
  const flexible = new Set(["=", ":", ",", "{", "}", "(", ")", "[", "]", "?", "=>", "===", "!==", "==", "!=", "&&", "||", "??", "+"]);
  let result = "";
  for (let i = 0; i < items.length; i++) {
    const current = items[i]!;
    const previous = items[i-1];
    const next = items[i+1];
    if (previous) {
      const jsxBranch = ["=>", "&&", "?", ":"].includes(previous.token) && current.token === "<";
      if (jsxBranch) {
        result += "\\s*(?:\\(\\s*)?";
      } else if (previous.token === ">" && current.token === "<" && !current.before) {
        result += codeSpace;
      } else if (current.before) {
        result += flexible.has(previous.token) || flexible.has(current.token) || current.token === ">" || current.token === "/" ?
          visibleSpace + "*" : visibleSpace + "+";
      } else if (flexible.has(previous.token) || flexible.has(current.token) || (previous.token === "/" && current.token === ">")) {
        result += codeSpace;
      }
      // Prettier may add a legal trailing comma to an object literal or
      // function call split over multiple lines. Never allow it in JSX props.
      if ((current.token === "}" && /\b[\w$]+:\s*[^=]/.test(fragment) && previous.token !== "," && previous.token !== "{") ||
          (current.token === ")" && fragment.includes("(") && previous.token !== "," && previous.token !== "(" && previous.token !== "=>")) {
        result += "(?:,\\s*)?";
      }
    }
    result += current.pattern ?? escapeRegExp(current.token);
    // A closing JSX tag may be followed by a formatter-added closing paren.
    if (current.token === ">" && previous?.token === "/" && next && [")", "}"].includes(next.token) &&
        /(?:=>|&&|\?)\s*\(?\s*</.test(fragment)) result += "(?:\\s*\\))?";
  }
  return new RegExp(result);
}

export function sourceIndex(source: string, fragment: string, start = 0): number {
  const offset = Math.max(0, start);
  const match = sourceFragment(fragment).exec(source.slice(offset));
  return match ? offset + match.index : -1;
}
