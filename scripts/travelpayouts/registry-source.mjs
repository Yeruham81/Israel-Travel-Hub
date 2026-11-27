import ts from "typescript";

// Parse source only: never import or execute registry.ts.
const unwrap = (node) => {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node))) node = node.expression;
  return node;
};
const name = (node) =>
  node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : undefined;
const string = (node) => {
  node = unwrap(node);
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
};
function property(object, key) {
  const matches = object.properties.filter((p) => name(p.name) === key);
  if (matches.length > 1) throw Error("Duplicate registry property: " + key);
  if (matches.length && !ts.isPropertyAssignment(matches[0])) throw Error("Non-static registry property: " + key);
  return matches[0];
}
function parse(source) {
  const tree = ts.createSourceFile("registry.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (tree.parseDiagnostics.length) throw Error("Registry syntax invalid");
  return tree;
}
function declaration(tree, key) {
  const matches = tree.statements.flatMap((s) => ts.isVariableStatement(s) ? [...s.declarationList.declarations] : []).filter((d) => name(d.name) === key);
  if (matches.length !== 1 || !matches[0].initializer) throw Error("Missing or duplicate registry declaration: " + key);
  return unwrap(matches[0].initializer);
}
function config(tree) {
  const object = declaration(tree, "affiliateConfig");
  if (!ts.isObjectLiteralExpression(object)) throw Error("Affiliate config is not a static object");
  const keys = new Set();
  for (const p of object.properties) {
    const key = name(p.name);
    if (!key || !ts.isPropertyAssignment(p) || keys.has(key)) throw Error("Invalid or duplicate affiliate entry: " + key);
    keys.add(key);
  }
  return object;
}
function trackingValue(p) {
  if (!p) return { state: "missing" };
  const value = unwrap(p.initializer);
  if (ts.isIdentifier(value) && value.text === "undefined") return { state: "pending" };
  if (!ts.isObjectLiteralExpression(value)) throw Error("Unexpected affiliate value");
  const url = string(property(value, "trackingUrl")?.initializer);
  if (!url || !url.startsWith("https://") || value.properties.length !== 1) throw Error("Invalid tracking entry");
  return { state: "configured", url };
}
export function registry(source) {
  const tree = parse(source);
  const object = config(tree);
  return {
    tracking(key) { return trackingValue(property(object, key)); },
    shore(id) {
      const array = declaration(tree, "shoreTourProducts");
      if (!ts.isArrayLiteralExpression(array)) throw Error("Unexpected shore catalog");
      const matches = array.elements.map(unwrap).filter((e) => ts.isObjectLiteralExpression(e) && string(property(e, "id")?.initializer) === id);
      if (matches.length !== 1) throw Error("Missing or duplicate shore product: " + id);
      return { platform: string(property(matches[0], "partnerId")?.initializer), url: string(property(matches[0], "publicUrl")?.initializer) };
    },
    airport(partner, url) {
      const sourceId = { kiwitaxi: "kiwitaxi-airport", welcome: "welcome-telaviv", intui: "intui-airport", gettransfer: "gettransfer-telaviv" }[partner];
      if (!sourceId) return false;
      const matches = [];
      const visit = (node) => {
        if (ts.isObjectLiteralExpression(node) && string(property(node, "id")?.initializer) === sourceId && property(node, "url")) matches.push(string(property(node, "url").initializer));
        ts.forEachChild(node, visit);
      };
      visit(tree);
      return matches.length === 1 && matches[0] === url;
    },
    tour(product, partner, url) {
      const call = declaration(tree, "tourBookingOffers");
      if (!ts.isCallExpression(call) || !ts.isPropertyAccessExpression(call.expression) || call.expression.name.text !== "map") throw Error("Unexpected tour offer catalog");
      const array = unwrap(call.expression.expression);
      if (!ts.isArrayLiteralExpression(array)) throw Error("Unexpected tour offer source");
      const matches = array.elements.map(unwrap).filter((e) => ts.isArrayLiteralExpression(e) && string(e.elements[0]) === product && string(e.elements[1]) === partner);
      return matches.length === 1 && string(matches[0].elements[2]) === url;
    },
  };
}
// Replace only the identified AST initializer, or insert a unique property.
// Unrelated source and comments are preserved. Missing keys and overwrites
// require explicit opt-in; failed API results never remove existing entries.
export function setTracking(source, key, url, { allowInsert = false, allowReplace = false } = {}) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) throw Error("Invalid tracking URL");
  const tree = parse(source);
  const object = config(tree);
  const p = property(object, key);
  const current = trackingValue(p);
  if (current.url === url) return source;
  const value = "{ trackingUrl: " + JSON.stringify(url) + " }";
  let next;
  if (p) {
    if (current.state === "configured" && !allowReplace) throw Error("Refusing to overwrite existing tracking entry " + key);
    next = source.slice(0, p.initializer.getStart(tree)) + value + source.slice(p.initializer.end);
  } else {
    if (!allowInsert) throw Error("Missing tracking entry " + key);
    const pos = object.end - 1;
    const comma = object.properties.length && !object.properties.hasTrailingComma ? "," : "";
    next = source.slice(0, pos) + comma + "\n  " + JSON.stringify(key) + ": " + value + ",\n" + source.slice(pos);
  }
  if (registry(next).tracking(key).url !== url) throw Error("Tracking edit verification failed");
  return next;
}
