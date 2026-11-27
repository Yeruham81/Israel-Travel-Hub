import { build } from "vite";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const root = process.cwd();
const temporary = fs.mkdtempSync(path.join(root, ".guide-directory-"));
try {
  const marker = "__STAGE5_IMPORTED_ASSET__:";
  await build({
    configFile: false,
    root,
    resolve: { alias: { "@": path.join(root, "src") } },
    ssr: { noExternal: true },
    plugins: [
      {
        name: "snapshot-assets-as-source-identifiers",
        enforce: "pre",
        load(id) {
          const p = id.split("?")[0];
          if (
            !p.startsWith(root + "/src/") ||
            !/\.(?:webp|jpe?g|png|svg|gif|avif|ico|woff2?)$/i.test(p)
          )
            return;
          return (
            "export default " +
            JSON.stringify(marker + path.relative(root, p).replaceAll("\\", "/")) +
            ";"
          );
        },
      },
    ],
    build: {
      ssr: path.join(root, "scripts/guide-directory-entry.ts"),
      outDir: temporary,
      emptyOutDir: true,
      minify: false,
      rollupOptions: { output: { entryFileNames: "snapshot.mjs" } },
    },
  });
  const { snapshot } = await import(pathToFileURL(path.join(temporary, "snapshot.mjs")).href);
  if (!Array.isArray(snapshot.guideDirectory) || snapshot.guideDirectory.length < 30)
    throw Error("Incomplete directory");
  const assets = new Map();
  function serialize(value) {
    if (typeof value === "string" && value.startsWith(marker)) {
      const file = value.slice(marker.length);
      if (!fs.existsSync(path.join(root, file))) throw Error("Missing asset " + file);
      if (!assets.has(file)) assets.set(file, "photo" + assets.size);
      return assets.get(file);
    }
    if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "undefined";
    if (Array.isArray(value)) return "[" + value.map(serialize).join(",") + "]";
    return (
      "{" +
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => JSON.stringify(k) + ":" + serialize(v))
        .join(",") +
      "}"
    );
  }
  const values = Object.entries(snapshot).map(([k, v]) => ({ k, code: serialize(v) }));
  const types = {
    guideDirectory: "DirectoryEntry[]",
    travelGuidePhotos: "Record<TravelGuideId, DirectoryPhoto>",
    attractionGuidePhotos: "Record<AttractionId, DirectoryPhoto | null>",
    travelGuideCardPhotos: "Record<TravelGuideId, DirectoryPhoto>",
  };
  const output = [
    "// Generated from the original editorial data for this build; do not hand edit.",
    'import type { GuideDirectoryEntry, GuidePhoto } from "@/data/travelGuides";',
    'import type { TravelGuideId } from "@/data/travel-guide-paths";',
    'import type { AttractionId } from "@/data/attractionGuideTypes";',
    'import { guideTopics, type GuideTopicId } from "@/data/guide-topics";',
    'export { guideTopics, type GuideTopicId } from "@/data/guide-topics";',
    "type DirectoryPhoto = GuidePhoto & { label?: string; mobileSrc?: string };",
    'type DirectoryEntry = Omit<GuideDirectoryEntry, "photo"> & { photo?: DirectoryPhoto };',
    ...[...assets].map(
      ([p, id]) => "import " + id + " from " + JSON.stringify("@/" + p.slice(4)) + ";",
    ),
    ...values.map(({ k, code }) => "export const " + k + ": " + types[k] + " = " + code + ";"),
  ];
  // Reuse exact filtering implementation rather than maintain a duplicate.
  const original = fs.readFileSync("src/data/travelGuides.ts", "utf8");
  const start = original.indexOf("export function isGuideTopic(");
  if (start < 0) throw Error("Missing directory filters");
  output.push(original.slice(start));
  fs.mkdirSync("src/data/generated", { recursive: true });
  const target = "src/data/generated/guide-directory.ts";
  const generated = output.join("\n").trimEnd() + "\n";
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== generated)
    fs.writeFileSync(target, generated);
  console.log(
    "DIRECTORY_SNAPSHOT",
    JSON.stringify({
      entries: snapshot.guideDirectory.length,
      guidePhotos: Object.keys(snapshot.travelGuidePhotos).length,
      attractionPhotos: Object.keys(snapshot.attractionGuidePhotos).length,
      importedAssets: assets.size,
      bytes: Buffer.byteLength(output.join("\n")),
    }),
  );
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
