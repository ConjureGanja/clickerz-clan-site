import * as esbuild from "esbuild";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const result = await esbuild.build({
  absWorkingDir: fileURLToPath(new URL("..", import.meta.url)),
  entryPoints: ["src/poh/standalone.jsx"],
  bundle: true,
  format: "iife",
  minify: true,
  write: false,
  outfile: "poh-planner.js",
  platform: "browser",
  jsx: "automatic",
  legalComments: "none",
  define: { "process.env.NODE_ENV": '"production"' },
});

const js = result.outputFiles.find((file) => file.path.endsWith(".js"))?.text;
const css = result.outputFiles.find((file) => file.path.endsWith(".css"))?.text ?? "";
if (!js) throw new Error("esbuild did not emit JavaScript");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>G I Clickerz — POH Planner</title>
  <style>
    html, body { margin: 0; background: #0c0c0f; }
    #poh-root { min-height: 100vh; padding: 1rem 0 2rem; }
    ${css}
  </style>
</head>
<body>
  <div id="poh-root"></div>
  <script>${js}</script>
</body>
</html>
`;

const target = fileURLToPath(new URL("../public/poh-planner.html", import.meta.url));
writeFileSync(target, html);
console.log("wrote", target, html.length);
