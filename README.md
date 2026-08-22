# b-plum Portfolio

个人静态作品集，使用 React、TypeScript、Vite 和 Tailwind CSS 构建。

## 本地开发

需要 Node.js 22.12 或更高版本。

```bash
npm install
npm run dev
```

## 检查与构建

```bash
npm run lint
npm run test -- --run
npm run build
```

生产文件会输出到 `dist/`。

## 添加项目

1. 在 `src/content/projects/` 添加一个 Markdown 正文文件。
2. 在 `src/data/projects.ts` 添加对应的类型化项目元数据和正文导入。
3. 将封面放入 `public/images/`，或使用稳定的远程图片 URL。
4. `status` 为 `published` 时会显示详情页入口；`coming-soon` 不会显示无效外链。

## Netlify 部署

仓库已包含 `netlify.toml` 和 `public/_redirects`：

- Build command: `npm run build`
- Publish directory: `dist`

连接 GitHub 后 Netlify 会自动构建；也可以执行构建后手动上传 `dist/`。
