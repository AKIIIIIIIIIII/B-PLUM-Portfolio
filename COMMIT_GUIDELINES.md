# Git Commit 规范

本项目使用 Conventional Commits 风格记录提交，方便后续按功能、修复和重构内容检索项目演进。

## 基本格式

```text
<type>(<scope>): <简洁的英文动词标题>

・<改动内容>
・<改动原因或影响>
```

例如：

```text
feat(i18n): add bilingual navigation labels
```

需要补充背景或影响范围时，在标题后增加正文：

```text
fix(responsive): prevent project cards from overflowing on mobile

・Adjust card spacing and image constraints at narrow breakpoints.
・Keep the project grid readable without horizontal scrolling.
```

## type 约定

| type | 使用场景 |
| --- | --- |
| `feat` | 新增用户可感知的功能或内容 |
| `fix` | 修复功能、样式、布局或兼容性问题 |
| `refactor` | 不改变功能目标的代码结构调整 |
| `docs` | README、项目说明或其他文档变更 |
| `test` | 新增或调整测试，且测试是本次提交的主要目的 |
| `chore` | 构建配置、依赖、脚本或其他维护工作 |

如果一次提交同时包含多个方面，选择最能表达用户或项目影响的 type；不要为了凑类型拆分一次正常的配套改动。

## scope 约定

优先使用下面这些 scope：

| scope | 使用场景 |
| --- | --- |
| `app` | 应用入口、整体架构或页面装配 |
| `home` | 首页区块、首页导航或首页布局 |
| `hero` | 首屏文字、主视觉和 Hero 图片 |
| `projects` | 项目卡片、项目列表和项目元数据 |
| `case-study` | 项目详情页、案例正文和案例画廊 |
| `i18n` | 多语言文案、语言切换和本地化逻辑 |
| `responsive` | 跨移动端、平板和桌面的响应式行为 |
| `docs` | 文档本身 |
| `tooling` | Vite、TypeScript、Lint、测试或部署配置 |

如果改动只属于一个明确模块，使用模块 scope；如果影响多个页面但没有单一模块可代表，使用 `app`。不要为了新增 scope 而创建同义词。

## 标题规则

- 使用英文，保持与现有提交历史一致。
- 使用现在时、动词开头，例如 `add`、`refine`、`fix`、`remove`、`update`。
- 标题描述“改了什么以及影响哪里”，不要只写 `update`、`changes` 或 `minor fixes`。
- 标题首字母小写，不加句号。
- 标题尽量控制在 72 个字符以内。
- 一个 commit 聚焦一个完整意图；代码、测试和必要文档可以作为同一意图的一部分一起提交。

推荐：

```text
feat(case-study): add shared project detail sections
fix(hero): keep desktop image inside the content frame
refactor(home): remove the generic features section
docs(commit): document the repository commit convention
```

不推荐：

```text
update stuff
fix
完成首页修改
minor changes.
```

## 是否需要正文

以下情况建议增加正文：

- 改动涉及多个文件或多个页面。
- 需要说明为什么采用某种布局、数据结构或兼容方案。
- 修复问题的原因不容易从标题看出。
- 提交会影响后续维护、部署或内容编辑。

简单、单一、容易从标题理解的改动可以不写正文。

正文统一使用箇条書き格式：

- 每一行以全角 `・` 开头。
- 每行只表达一个完整信息点。
- 优先说明改动内容、改动原因和用户或项目影响。
- 通常写 1–3 条，避免变成逐文件变更清单。

推荐：

```text
・Add consistent metadata and content sections across published projects.
・Reuse the shared case-study structure to simplify future project additions.
```

不推荐：

```text
This commit updates several files and improves the page.
```

## 新增 commit 前检查

提交前按以下顺序检查：

1. 确认本次改动属于一个完整意图。
2. 选择最准确的 `type` 和 `scope`。
3. 用英文动词写清楚改动结果。
4. 判断是否需要补充正文。
5. 检查是否误把无关改动放进本次提交。
6. 根据改动范围执行必要检查：

   ```bash
   npm run lint
   npm run test -- --run
   npm run build
   ```

不必每次都执行全部检查，但涉及页面行为、数据结构或构建配置时，应至少运行对应的 lint、测试或 build。

## 提交命令模板

简单提交：

```bash
git add <相关文件>
git commit -m "fix(responsive): prevent project cards from overflowing"
```

带正文的提交：

```bash
git add <相关文件>
git commit -m "feat(case-study): add shared project detail sections" \
  -m "・Add consistent metadata, content sections, and navigation." \
  -m "・Reuse the shared structure for future project additions."
```

## 历史整理原则

如果需要重新整理已有提交：

- 保留代码内容、提交顺序和原始时间线，除非明确决定合并提交。
- 先创建备份分支或标签，再在独立分支重写历史。
- 用“原 SHA → 新 SHA → 新提交信息”保留映射记录。
- 完成 lint、测试和 build 后再更新远程历史。
- 更新远程分支时使用 `--force-with-lease`，不要使用无保护的强制推送。

新增提交时不需要重写历史，只需遵循本文档的格式。
