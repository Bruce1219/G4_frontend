// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///D:/test/_vuetest/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/test/_vuetest/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///D:/test/_vuetest/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/test/_vuetest/vite.config.js";
var vite_config_default = defineConfig(
  ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    console.log("Mode:", mode);
    console.log("ENV:", env);
    return {
      base: "/cid101/g4/front/",
      build: {
        outDir: "front"
      },
      plugins: [vue(), VueDevTools()],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "@/assets/scss/style.scss";`
          }
        }
      },
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
        }
      },
      define: {
        "import.meta.env.VITE_FILE_URL": JSON.stringify(env.VITE_FILE_URL),
        "import.meta.env.VITE_ORIGIN_URL": JSON.stringify(env.VITE_ORIGIN_URL),
        "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL)
      }
    };
  }
  // else {
  //   // 放原本的設定
  //   return {
  //     plugins: [vue(), VueDevTools()],
  //     css: {
  //       preprocessorOptions: {
  //         scss: {
  //           additionalData: `@import "@/assets/scss/style.scss";`
  //         }
  //       }
  //     },
  //     resolve: {
  //       alias: {
  //         '@': fileURLToPath(new URL('./src', import.meta.url))
  //       }
  //     }
  //   }
  // }
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0ZXN0XFxcXF92dWV0ZXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx0ZXN0XFxcXF92dWV0ZXN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi90ZXN0L192dWV0ZXN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXHJcbiAgY29uc29sZS5sb2coJ01vZGU6JywgbW9kZSlcclxuICBjb25zb2xlLmxvZygnRU5WOicsIGVudilcclxuICAvLyBcdTY1M0VcdTZFOTZcdTUwOTlcdTkwRThcdTdGNzJcdTUyMzBzZXJ2ZXJcdTc2ODRcdThBMkRcdTVCOUFcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogJy9jaWQxMDEvZzQvZnJvbnQvJyxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJ2Zyb250J1xyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFt2dWUoKSwgVnVlRGV2VG9vbHMoKV0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIkAvYXNzZXRzL3Njc3Mvc3R5bGUuc2Nzc1wiO2BcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX0ZJTEVfVVJMJzogSlNPTi5zdHJpbmdpZnkoZW52LlZJVEVfRklMRV9VUkwpLFxyXG4gICAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfT1JJR0lOX1VSTCc6IEpTT04uc3RyaW5naWZ5KGVudi5WSVRFX09SSUdJTl9VUkwpLFxyXG4gICAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX1VSTCc6IEpTT04uc3RyaW5naWZ5KGVudi5WSVRFX0FQSV9VUkwpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiAgLy8gZWxzZSB7XHJcbiAgLy8gICAvLyBcdTY1M0VcdTUzOUZcdTY3MkNcdTc2ODRcdThBMkRcdTVCOUFcclxuICAvLyAgIHJldHVybiB7XHJcbiAgLy8gICAgIHBsdWdpbnM6IFt2dWUoKSwgVnVlRGV2VG9vbHMoKV0sXHJcbiAgLy8gICAgIGNzczoge1xyXG4gIC8vICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAvLyAgICAgICAgIHNjc3M6IHtcclxuICAvLyAgICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9hc3NldHMvc2Nzcy9zdHlsZS5zY3NzXCI7YFxyXG4gIC8vICAgICAgICAgfVxyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgcmVzb2x2ZToge1xyXG4gIC8vICAgICAgIGFsaWFzOiB7XHJcbiAgLy8gICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuKSJdLAogICJtYXBwaW5ncyI6ICI7QUFBd08sU0FBUyxlQUFlLFdBQVc7QUFDM1EsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBSHFILElBQU0sMkNBQTJDO0FBTTlMLElBQU8sc0JBQVE7QUFBQSxFQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsVUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFlBQVEsSUFBSSxTQUFTLElBQUk7QUFDekIsWUFBUSxJQUFJLFFBQVEsR0FBRztBQUV2QixXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7QUFBQSxNQUM5QixLQUFLO0FBQUEsUUFDSCxxQkFBcUI7QUFBQSxVQUNuQixNQUFNO0FBQUEsWUFDSixnQkFBZ0I7QUFBQSxVQUNsQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxPQUFPO0FBQUEsVUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLFFBQ3REO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04saUNBQWlDLEtBQUssVUFBVSxJQUFJLGFBQWE7QUFBQSxRQUNqRSxtQ0FBbUMsS0FBSyxVQUFVLElBQUksZUFBZTtBQUFBLFFBQ3JFLGdDQUFnQyxLQUFLLFVBQVUsSUFBSSxZQUFZO0FBQUEsTUFDakU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW1CQTsiLAogICJuYW1lcyI6IFtdCn0K
