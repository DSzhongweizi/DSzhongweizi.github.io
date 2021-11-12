import { defineConfig } from "vite";
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vuePlugin from "@vitejs/plugin-vue";
import { resolve } from "path";
import fs from "fs-extra";
import matter from "gray-matter";
import elementPlusPlugin from "vite-plugin-element-plus";
import markdownPlugin from "vite-plugin-md";
import pagesPlugin from "vite-plugin-pages";
import prism from "markdown-it-prism";
export default defineConfig({
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'https://blog-1393931-1258987167.ap-shanghai.run.tcloudbase.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [
    vuePlugin({ include: [/\.vue$/, /\.md$/] }),
    Components({ resolvers: [ElementPlusResolver()]}),
    elementPlusPlugin({ useSource: true }),
    markdownPlugin({ headEnabled: true, markdownItUses: [prism] }),
    pagesPlugin({
      pagesDir: [
        { dir: "docs/前端", baseRoute: "front-end-dev" },
        { dir: "docs/后端", baseRoute: "back-end-dev" },
        { dir: "docs/科学", baseRoute: "science-garden" },
      ],
      extensions: ["vue", "md"],
      extendRoute(route, parent) {
        const path = resolve(__dirname, route.component.slice(1));
        const stat = fs.statSync(path);
        const mat = matter(fs.readFileSync(path, "utf-8"));
        mat.data.desc = mat.data.desc ?? mat?.content.slice(0, 200);
        route.path = route.path.replace(
          /(\/[^\/]+\/)(\S*)/,
          (m, p1) => `${p1}${stat.ino}`
        );
        route.meta = Object.assign(route.meta || {}, {
          frontmatter: {
            ...mat?.data,
            ctime: route.meta?.ctime || stat.birthtime, // 创建时间
            atime: route.meta?.atime || stat.mtime, // 更改时间
          },
        });
        return route;
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      md: resolve(__dirname, "article"),
      assets: "@/assets",
      cp: resolve(__dirname, "src/components"),
      views: "@/views",
      api: "@/service/http",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        // additionalData: `@use "./src/assets/scss/common.scss";`
      },
    },
  },
});
