import ts from "typescript";

// Parse source only: never import or execute registry.ts.
const unwrap = (node) => {
  while (
    node &&
    (ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node))
  )
    node = node.expression;
  return node;
};
const name = (node) =>
  node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : undefined;
const string = (node) => {
  node = unwrap(node);
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    ? node.text
    : undefined;
};
function property(object, key) {
  const matches = object.properties.filter((p) => name(p.name) === key);
  if (matches.length > 1) throw Error("Duplicate registry property: " + key);
  if (matches.length && !ts.isPropertyAssignment(matches[0]))
    throw Error("Non-static registry property: " + key);
  return matches[0];
}
function parse(source) {
  const tree = ts.createSourceFile(
    "registry.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (tree.parseDiagnostics.length) throw Error("Registry syntax invalid");
  return tree;
}
function declaration(tree, key) {
  const matches = tree.statements
    .flatMap((s) => (ts.isVariableStatement(s) ? [...s.declarationList.declarations] : []))
    .filter((d) => name(d.name) === key);
  if (matches.length !== 1 || !matches[0].initializer)
    throw Error("Missing or duplicate registry declaration: " + key);
  return unwrap(matches[0].initializer);
}
function tourTuples(tree) {
  const call = declaration(tree, "tourBookingOffers");
  if (
    !ts.isCallExpression(call) ||
    !ts.isPropertyAccessExpression(call.expression) ||
    call.expression.name.text !== "map"
  )
    throw Error("Unexpected tour offer catalog");
  const array = unwrap(call.expression.expression);
  if (!ts.isArrayLiteralExpression(array)) throw Error("Unexpected tour offer source");
  return array.elements.map(unwrap);
}
// Recognize only the catalog's audited default-entry expression. Derive the
// keys statically from the source tuples; never evaluate arbitrary code.
function defaultKeys(tree, spread) {
  const outer = unwrap(spread.expression);
  const member = (node, owner, key) =>
    ts.isPropertyAccessExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === owner &&
    node.name.text === key &&
    !node.questionDotToken;
  if (
    !ts.isCallExpression(outer) ||
    !member(outer.expression, "Object", "fromEntries") ||
    outer.arguments.length !== 1 ||
    outer.questionDotToken
  )
    throw Error("Unsupported affiliate spread");
  const inner = unwrap(outer.arguments[0]);
  if (
    !ts.isCallExpression(inner) ||
    !member(inner.expression, "tourBookingOffers", "map") ||
    inner.arguments.length !== 1 ||
    inner.questionDotToken
  )
    throw Error("Unsupported affiliate spread source");
  const fn = unwrap(inner.arguments[0]);
  if (
    !ts.isArrowFunction(fn) ||
    fn.parameters.length !== 1 ||
    fn.modifiers?.length ||
    !ts.isIdentifier(fn.parameters[0].name) ||
    fn.parameters[0].initializer ||
    fn.parameters[0].dotDotDotToken
  )
    throw Error("Unsupported affiliate spread mapper");
  const tuple = unwrap(fn.body);
  if (
    !ts.isArrayLiteralExpression(tuple) ||
    tuple.elements.length !== 2 ||
    !member(tuple.elements[0], fn.parameters[0].name.text, "id") ||
    !ts.isIdentifier(tuple.elements[1]) ||
    tuple.elements[1].text !== "undefined"
  )
    throw Error("Unsupported affiliate spread value");
  const keys = new Set();
  for (const item of tourTuples(tree)) {
    if (!ts.isArrayLiteralExpression(item)) throw Error("Unexpected tour offer tuple");
    const product = string(item.elements[0]),
      partner = string(item.elements[1]);
    if (!product || !partner || !string(item.elements[2])) throw Error("Invalid tour offer tuple");
    const key = "tour-" + product + "-" + partner;
    if (keys.has(key)) throw Error("Duplicate tour offer: " + key);
    keys.add(key);
  }
  return keys;
}
function config(tree) {
  const object = declaration(tree, "affiliateConfig");
  if (!ts.isObjectLiteralExpression(object)) throw Error("Affiliate config is not a static object");
  const explicit = new Map();
  let defaults = new Set(),
    spreadIndex = -1;
  for (const [index, p] of object.properties.entries()) {
    if (ts.isSpreadAssignment(p)) {
      if (spreadIndex !== -1) throw Error("Duplicate affiliate default spread");
      defaults = defaultKeys(tree, p);
      spreadIndex = index;
      continue;
    }
    const key = name(p.name);
    if (!key || !ts.isPropertyAssignment(p) || explicit.has(key))
      throw Error("Invalid or duplicate affiliate entry: " + key);
    explicit.set(key, { node: p, index });
  }
  return { object, explicit, defaults, spreadIndex };
}
function effectiveTracking(catalog, key) {
  const entry = catalog.explicit.get(key);
  if (catalog.defaults.has(key) && (!entry || entry.index < catalog.spreadIndex))
    return { state: "pending" };
  return trackingValue(entry?.node);
}
function trackingValue(p) {
  if (!p) return { state: "missing" };
  const value = unwrap(p.initializer);
  if (ts.isIdentifier(value) && value.text === "undefined") return { state: "pending" };
  if (!ts.isObjectLiteralExpression(value)) throw Error("Unexpected affiliate value");
  const url = string(property(value, "trackingUrl")?.initializer);
  if (!url || !url.startsWith("https://") || value.properties.length !== 1)
    throw Error("Invalid tracking entry");
  return { state: "configured", url };
}
export function registry(source) {
  const tree = parse(source);
  const catalog = config(tree);
  return {
    tracking(key) {
      return effectiveTracking(catalog, key);
    },
    shore(id) {
      const array = declaration(tree, "shoreTourProducts");
      if (!ts.isArrayLiteralExpression(array)) throw Error("Unexpected shore catalog");
      const matches = array.elements
        .map(unwrap)
        .filter(
          (e) => ts.isObjectLiteralExpression(e) && string(property(e, "id")?.initializer) === id,
        );
      if (matches.length !== 1) throw Error("Missing or duplicate shore product: " + id);
      return {
        platform: string(property(matches[0], "partnerId")?.initializer),
        url: string(property(matches[0], "publicUrl")?.initializer),
      };
    },
    airport(partner, url) {
      const sourceId = {
        kiwitaxi: "kiwitaxi-airport",
        welcome: "welcome-telaviv",
        intui: "intui-airport",
        gettransfer: "gettransfer-telaviv",
      }[partner];
      if (!sourceId) return false;
      // Airport reference records are direct members of sourceCatalog.
      // Do not traverse unrelated generated records, callbacks or shorthand IDs.
      const array = declaration(tree, "sourceCatalog");
      if (!ts.isArrayLiteralExpression(array)) throw Error("Unexpected reference catalog");
      const matches = array.elements.map(unwrap).filter((node) => {
        if (!ts.isObjectLiteralExpression(node)) return false;
        const ids = node.properties.filter(
          (p) =>
            name(p.name) === "id" &&
            ts.isPropertyAssignment(p) &&
            string(p.initializer) === sourceId,
        );
        return ids.length > 0;
      });
      return (
        matches.length === 1 &&
        string(property(matches[0], "id")?.initializer) === sourceId &&
        string(property(matches[0], "url")?.initializer) === url
      );
    },
    tour(product, partner, url) {
      const matches = tourTuples(tree).filter(
        (e) =>
          ts.isArrayLiteralExpression(e) &&
          string(e.elements[0]) === product &&
          string(e.elements[1]) === partner,
      );
      return matches.length === 1 && string(matches[0].elements[2]) === url;
    },
  };
}
// Replace only the identified AST initializer, or insert a unique property.
// Unrelated source and comments are preserved. Missing keys and overwrites
// require explicit opt-in; failed API results never remove existing entries.
export function setTracking(source, key, url, { allowInsert = false, allowReplace = false } = {}) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.username || parsed.password)
    throw Error("Invalid tracking URL");
  const tree = parse(source);
  const catalog = config(tree);
  const { object } = catalog;
  const entry = catalog.explicit.get(key);
  const p = entry?.node;
  const current = effectiveTracking(catalog, key);
  if (entry && catalog.defaults.has(key) && entry.index < catalog.spreadIndex)
    throw Error("Refusing to edit a tracking entry shadowed by defaults: " + key);
  if (current.url === url) return source;
  const value = "{ trackingUrl: " + JSON.stringify(url) + " }";
  let next;
  if (p) {
    if (current.state === "configured" && !allowReplace)
      throw Error("Refusing to overwrite existing tracking entry " + key);
    next = source.slice(0, p.initializer.getStart(tree)) + value + source.slice(p.initializer.end);
  } else {
    if (current.state === "missing" && !allowInsert) throw Error("Missing tracking entry " + key);
    const pos = object.end - 1;
    const comma = object.properties.length && !object.properties.hasTrailingComma ? "," : "";
    next =
      source.slice(0, pos) +
      comma +
      "\n  " +
      JSON.stringify(key) +
      ": " +
      value +
      ",\n" +
      source.slice(pos);
  }
  if (registry(next).tracking(key).url !== url) throw Error("Tracking edit verification failed");
  return next;
}
