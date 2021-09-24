// import path from "path";
// import fs from "fs";
// import marked from "marked";
// export default function (options: any) {
//   return {
//     name: 'markdown',
//     configureServer(server: { middlewares: { use: (arg0: (req: any, res: any, next: any) => void) => void; }; }) {
//       server.middlewares.use((req, res, next) => {
//         // Vite 的 dev 服务器
//         console.log(res);
//         // if (req.path.endsWith(".md")) {
//         //   res.type = "js";
//         //   const filePath = path.join(process.cwd(), req.path);
//         //   res.body = `${JSON.stringify(marked(fs.readFileSync(filePath).toString()))}`
//         // } else {
//         //   next();
//         // }
//       })
//     },
//     transform(src: any, id: string) {
//      // 用于 rollup // 插件
//       if (id.endsWith(".md")) { // 判断结尾字符串判断是否为markdown文件
//         console.log(src, id);
//         return {
//           code: `${JSON.stringify(marked(src))}`, // code是转换后最终输出的代码
//           map: null // 是否提供source map，这里可以不用考虑
//         }
//       }
//     }
//   }
// }
