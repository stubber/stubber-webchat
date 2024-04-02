import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  console.log(`Building for ${mode}...`);

  let config = {
    plugins: [
      svelte({
        compilerOptions: {
          customElement: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '$': resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: (bundle_info) => {
            if (bundle_info.name == "main"){
              return "index.js"
            }
            if (bundle_info.name == 'demo'){
              return "demo.js"
            }
            if (bundle_info.name == 'demo_builder'){
              return "demo_builder.js"
            }
          },
          manualChunks: undefined,
        },
        input: {
          main: resolve(__dirname, "./src/lib/webchat.svelte"),
          demo: resolve(__dirname, "./src/lib/webchat_demo.svelte"),
          demo_builder: resolve(__dirname, "./src/lib/webchat_demo_builder.svelte")
        },
      },
    },
    envDir: "./",
  }

  if (mode == "development") {
    config.build.rollupOptions.output.dir = "./dist_dev"
  }

  if (mode == "production") {
    config.build.rollupOptions.output.dir = "./dist"
  }

  return config
});
