import path from "node:path";
import { cwd } from "node:process";
import { argv } from "node:process";
import { readFile } from "node:fs/promises";

import { build } from "tsup";

/** @type {import("esbuild").Plugin} */
const serverPlugin = {
  name: "server",
  setup(build) {
    build.onLoad({ filter: /\/src\// }, async (args) => {
      if (!args.path.startsWith(path.join(cwd(), "src"))) return;

      const parts = path.parse(args.path);
      const serverPath = path.join(parts.dir, parts.name + "-server" + parts.ext);
      try {
        const contents = await readFile(serverPath);
        return { contents, loader: "ts" };
      } catch {}
    });
  },
}

/** @type {import("tsup").Options} */
const clientConfig = {
  entry: ["src/index.ts"],
  format: "esm",
  dts: true,
  sourcemap: true,
};

/** @type {import("tsup").Options} */
const serverConfig = {
  entry: ["src/index.ts"],
  format: "esm",
  esbuildPlugins: [serverPlugin],
  esbuildOptions(options) {
    options.entryNames = "[dir]/[name]-server";
  },
};

if (argv.includes("--watch")) {
  clientConfig.watch = true;
  serverConfig.watch = true;
} else {
  clientConfig.minify = true;
  serverConfig.minify = true;
}

await Promise.all([
  build(clientConfig),
  build(serverConfig),
]);
