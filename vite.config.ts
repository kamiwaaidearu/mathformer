import { defineConfig, type Plugin } from "vite";

function inlineEverything(): Plugin {
  return {
    name: "inline-everything",
    enforce: "post",
    generateBundle(_options, bundle) {
      const htmlFile = Object.values(bundle).find(
        (b) => b.type === "asset" && b.fileName === "index.html",
      );
      if (!htmlFile || htmlFile.type !== "asset") return;

      let html = typeof htmlFile.source === "string"
        ? htmlFile.source
        : new TextDecoder().decode(htmlFile.source);

      // Collect all JS chunk code
      const jsChunks: string[] = [];
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "chunk") {
          jsChunks.push(chunk.code);
          delete bundle[fileName];
        }
      }

      // Remove all existing script tags and modulepreload links
      html = html.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "");
      html = html.replace(/<link[^>]*modulepreload[^>]*>/g, "");

      // Inject inlined script (NOT type="module") right before </body>
      // This ensures the DOM is ready and avoids file:// CORS issues
      const inlinedScript = `<script>(function(){${jsChunks.join("\n")}})()</script>`;
      html = html.replace("</body>", `${inlinedScript}\n</body>`);

      htmlFile.source = html;
    },
  };
}

export default defineConfig({
  plugins: [inlineEverything()],
  build: {
    assetsInlineLimit: 100000,
    // Emit IIFE format instead of ESM so it works without module support
    rollupOptions: {
      output: {
        format: "iife",
      },
    },
  },
});
