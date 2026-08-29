import type { Locale } from "../i18n";
import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    slug: "fusheng-records",
    year: "2026",
    status: "published",
    technologies: ["Agent Skills", "TypeScript", "Three.js", "IndexedDB"],
    platform: "ChatGPT / Codex",
    coverImage: { src: "https://raw.githubusercontent.com/Tabascoiiii/B-PLUM-FushengRecords/main/docs/images/album-cover.png" },
    gallery: [
      { src: "https://raw.githubusercontent.com/Tabascoiiii/B-PLUM-FushengRecords/main/docs/images/album-past.png" },
      { src: "https://raw.githubusercontent.com/Tabascoiiii/B-PLUM-FushengRecords/main/docs/images/album-future.png" },
    ],
    repositoryUrl: "https://github.com/Tabascoiiii/B-PLUM-FushengRecords",
    featured: true,
    locales: {
      en: {
        title: "B-PLUM-FushengRecords",
        category: "Agent Skill Plugin",
        summary: "A ChatGPT and Codex plugin that turns memories and future wishes into collectible tickets, then stores them in a local interactive album modeled after traditional Chinese books.",
        coverImage: { alt: "Closed Fusheng Records album on a traditional wooden desk", caption: "Closed Fusheng Records album" },
        gallery: [
          { alt: "Fusheng Records past chapter filled with memorial tickets", caption: "Past chapter with memorial tickets" },
          { alt: "Fusheng Records future chapter filled with wish tickets", caption: "Future chapter with wish tickets" },
        ],
        sections: [
          { id: "context", title: "Context & goal", content: "I made B-PLUM-FushengRecords to give memories and future wishes a form beyond a note or a folder of photos. Each moment becomes a ticket, and the tickets live in a local interactive album modeled after a traditional Chinese book." },
          { id: "contribution", title: "My contribution", content: "I handled the product concept, Skill architecture, ticket design, JSON contract, and album implementation. Separate Skills create tickets, build albums, collect PNG/JSON pairs, and prepare fictional samples." },
          { id: "decisions", title: "Experience & decisions", content: "The plugin shows a ticket brief before rendering anything. It creates the final PNG and JSON only after the user enters `出票` exactly, and it never overwrites an existing album directory. Fictional samples are labeled, while future tickets record a wish rather than promise an outcome." },
          { id: "implementation", title: "Implementation", content: "`make-life-ticket` writes matching PNG/JSON files. `bind-life-album` builds the album, `collect-life-tickets` imports complete pairs without redrawing or cropping the art, and `create-fusheng-record` coordinates the workflow. The album runs on TypeScript and Three.js; tickets added in the browser are stored in IndexedDB." },
          { id: "outcome", title: "Outcome & learnings", content: "The plugin can produce one ticket from a personal story or open with an album containing five fictional past tickets and five future tickets. I learned that when a tool handles personal material, confirmation and storage rules have to be part of the core workflow." },
        ],
      },
      ja: {
        title: "B-PLUM-FushengRecords",
        category: "エージェントスキルプラグイン",
        summary: "人生の記憶やこれから叶えたいことを切符に仕立て、古籍風のインタラクティブな冊子へ収める、ChatGPT・Codex向けプラグインです。データはローカルに保存します。",
        coverImage: { alt: "伝統的な机に置かれた、表紙を閉じた浮生録", caption: "表紙を閉じた浮生録" },
        gallery: [
          { alt: "思い出の記念票を収めた浮生録の過去篇", caption: "記念票を収めた過去篇" },
          { alt: "これから叶えたいことを記した切符を収めた浮生録の未来篇", caption: "願いの切符を収めた未来篇" },
        ],
        sections: [
          { id: "context", title: "背景と目標", content: "思い出やこれから叶えたいことを、メモや写真フォルダとは違う形で残すために制作しました。ひとつの場面を一枚の切符に仕立て、古籍をもとにしたインタラクティブな冊子へ収めます。" },
          { id: "contribution", title: "担当したこと", content: "企画、Skillの設計、票面デザイン、JSONのデータ仕様、冊子の実装を担当しました。切符の作成、冊子の構築、PNG/JSONの収録、虚構サンプルの準備は、それぞれ独立したSkillに分けています。" },
          { id: "decisions", title: "体験設計と判断", content: "完成した切符をすぐに生成せず、先に切符の設計案である票単を提示します。利用者が`出票`と正確に入力した場合だけPNGとJSONを作成し、既存ディレクトリは上書きしません。虚構サンプルは明記し、未来票は実現を約束するものではなく、願いの記録として扱います。" },
          { id: "implementation", title: "実装", content: "`make-life-ticket`は同名のPNG/JSONを生成し、`bind-life-album`は冊子を構築します。`collect-life-tickets`は元画像を描き直したり切り抜いたりせずにファイル一式を収録し、`create-fusheng-record`が全体を進行します。冊子はTypeScriptとThree.jsで実装し、ブラウザから追加した切符はIndexedDBに保存します。" },
          { id: "outcome", title: "成果と学び", content: "個人の物語から一枚の切符を作る機能と、過去5枚・未来5枚の虚構サンプルを収めた冊子を実装しました。個人的な内容を扱う機能では、生成結果だけでなく、確認方法と保存先まで設計する必要があると分かりました。" },
        ],
      },
      zh: {
        title: "B-PLUM-FushengRecords",
        category: "智能体技能插件",
        summary: "一款面向 ChatGPT 与 Codex 的本地优先插件，将人生故事和想抵达的未来做成可收藏的票根，再收进古籍式互动藏本。",
        coverImage: { alt: "放在传统书案上的合拢状态浮生录", caption: "合拢状态的浮生录" },
        gallery: [
          { alt: "收录往昔纪念票的浮生录过去篇", caption: "收录纪念票的过去篇" },
          { alt: "收录未来愿望票根的浮生录未来篇", caption: "收录愿望票根的未来篇" },
        ],
        sections: [
          { id: "context", title: "背景与目标", content: "B-PLUM-FushengRecords 始于一个问题：如何把已经发生的一幕或想抵达的未来，整理成比备忘录和照片文件夹更适合收藏的形式。项目选择用人生票根承载单个场景，再把票根收进一本默认在本地运行、带有传统古籍气质的互动藏本。" },
          { id: "contribution", title: "我的工作", content: "我独立完成了产品概念、Skill 工作流、确认规则、票面视觉、JSON 数据协议与互动藏本，并持续核对智能体实际生成的文件。出票、造册、同名 PNG/JSON 收录和虚构样票准备被拆分为职责明确的 Skills，再组合成面向 ChatGPT 与 Codex 的完整插件。" },
          { id: "decisions", title: "体验与设计判断", content: "流程不会直接生成完成票，而是先展示票单，只有使用者准确回复`出票`后才创建最终的 PNG 与 JSON。藏本默认保存在本地，不覆盖已有目录；虚构样票会明确标注，未来票也只记录愿望，不把它写成承诺。" },
          { id: "implementation", title: "实现方式", content: "`make-life-ticket` 生成同名 PNG/JSON，`bind-life-album` 建立藏本，`collect-life-tickets` 则在不重绘、不裁切原图的前提下收录完整文件对。`create-fusheng-record` 负责协调全流程；藏本使用 TypeScript 与 Three.js 构建，网页后来加入的票根保存在 IndexedDB 中。" },
          { id: "outcome", title: "成果与收获", content: "最终插件既能从一段个人故事生成单张票根，也能用过去5张、未来5张虚构样票建立完整藏本，再逐步替换为使用者自己的内容。这个项目让我确认，将明确确认、原文件保留和本地存储写进工作流，可以在保护私人内容的同时维持创作节奏。" },
        ],
      },
    },
  },
  {
    slug: "easy-cat-minesweeper",
    year: "2025",
    status: "published",
    technologies: ["Java", "Swing", "Game"],
    platform: "Desktop / JDK 17+",
    coverImage: { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper/main/docs/screenshot.jpg" },
    repositoryUrl: "https://github.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper",
    featured: true,
    locales: {
      en: {
        title: "B-PLUM-EasyCatMinesweeper",
        category: "Mini Game",
        summary: "A desktop Minesweeper game built with Java Swing, with cat artwork and understated interaction feedback.",
        coverImage: { alt: "Cat-themed B-PLUM-EasyCatMinesweeper game board", caption: "Desktop game board" },
        sections: [
          { id: "context", title: "Context & goal", content: "B-PLUM-EasyCatMinesweeper rebuilds the standard Minesweeper rules as a Java Swing desktop game. Cat artwork and restrained feedback soften the familiar system-interface look without changing how the game works." },
          { id: "contribution", title: "My contribution", content: "I designed the visual direction, controls, game rules, and Java Swing implementation. The code separates window management, board layers, mine placement, number calculation, shared state, and UI settings." },
          { id: "decisions", title: "Experience & decisions", content: "The first click is always safe, so a round cannot end before the player has a chance to think. Left-click opens a tile; right-click adds or removes a marker. Hover and pressed states confirm input, while a small status area shows the remaining markers, elapsed time, and game state." },
          { id: "implementation", title: "Implementation", content: "`Minesweeper_Win` creates the Swing window and handles mouse input. `MapTop` and `MapBottom` keep the visible tiles separate from the minefield underneath; `BottomCat` places mines and `Num` calculates adjacent counts. `GameUtil` holds shared state, images, constants, and UI settings." },
          { id: "outcome", title: "Outcome & learnings", content: "The JDK 17+ game covers board generation, tile opening and marking, timing, status feedback, and win or loss handling. Separating the board state from its visible layer made the interaction rules easier to follow in code. The smaller lesson was visual: a few well-timed responses can change the feel of a game everyone already knows." },
        ],
      },
      ja: {
        title: "B-PLUM-EasyCatMinesweeper",
        category: "ミニゲーム",
        summary: "猫のビジュアルを取り入れた、Java Swing製のデスクトップ版マインスイーパーです。",
        coverImage: { alt: "猫のビジュアルを取り入れたB-PLUM-EasyCatMinesweeperのゲーム画面", caption: "デスクトップ版のプレイ画面" },
        sections: [
          { id: "context", title: "背景と目標", content: "マインスイーパーの基本ルールを保ったまま、Java Swingでデスクトップゲームとして作り直しました。猫のビジュアルと控えめな操作フィードバックを加え、従来のシステム画面より親しみやすい見た目にしています。" },
          { id: "contribution", title: "担当したこと", content: "企画、ビジュアル、操作、ゲームルール、Java Swingでの実装を担当しました。コードはウィンドウ、盤面レイヤー、地雷生成、数字計算、共有状態、UI設定の役割に分けています。" },
          { id: "decisions", title: "体験設計と判断", content: "開始直後の偶発的なゲームオーバーを防ぐため、最初にクリックしたマスには地雷を置きません。左クリックでマスを開き、右クリックで印を付け外しできます。ホバー中と押下中は表示を変え、操作が反映されたことを伝えます。残りの印、経過時間、ゲームの状態は小さなステータス欄にまとめました。" },
          { id: "implementation", title: "実装", content: "`Minesweeper_Win`はSwingウィンドウを生成し、マウス操作を処理します。`MapTop`と`MapBottom`は表側のマスと内部の地雷原を分け、`BottomCat`は地雷の生成、`Num`は周囲の地雷数の計算を担当します。共有状態、画像、定数、UI設定は`GameUtil`にまとめました。" },
          { id: "outcome", title: "成果と学び", content: "JDK 17以上で遊べるデスクトップゲームとして、安全な盤面生成、マスを開く操作と印付け、計時、状態表示、勝敗判定を実装しました。盤面の状態と表示を別レイヤーに分けたことで、操作ルールを追いやすい構成になりました。小さな反応を積み重ねるだけでも、定番ゲームの印象は変えられると分かりました。" },
        ],
      },
      zh: {
        title: "B-PLUM-EasyCatMinesweeper",
        category: "迷你游戏",
        summary: "一款使用 Java Swing 制作的桌面游戏，在熟悉的扫雷节奏中加入轻巧的猫咪主题视觉体验。",
        coverImage: { alt: "带有猫咪主题视觉的 B-PLUM-EasyCatMinesweeper 游戏界面", caption: "可实际游玩的桌面界面" },
        sections: [
          { id: "context", title: "背景与目标", content: "B-PLUM-EasyCatMinesweeper 起源于一次独立的桌面开发实验：用 Java Swing 重做熟悉的扫雷循环，并借助猫咪主题图像和柔和的视觉反馈，让体验更容易亲近。目标是做出一款小巧而完整的游戏，在保留玩家熟悉规则的同时，摆脱传统系统界面的生硬感。" },
          { id: "contribution", title: "我的工作", content: "我独立完成了产品概念、视觉方向、交互行为、游戏规则与 Java Swing 实现，并按照窗口、棋盘图层、地雷生成、数字计算、共享状态和界面设置等职责组织代码。" },
          { id: "decisions", title: "体验与设计判断", content: "第一次点击始终安全，让新一局不会因偶然而立刻结束。左键翻开方格，右键添加或移除标记，悬停和按下状态会清楚回应每次操作。紧凑的状态区持续显示剩余标记、经过时间和当前游戏状态，同时不打断游玩。" },
          { id: "implementation", title: "实现方式", content: "`Minesweeper_Win` 创建 Swing 窗口并处理鼠标事件，`MapTop` 与 `MapBottom` 将可见方格层和底层雷区分离。`BottomCat` 负责生成地雷，`Num` 计算周围地雷数量，`GameUtil` 则集中管理共享状态、图片、常量与界面设置。" },
          { id: "outcome", title: "成果与收获", content: "最终完成了一个可在 JDK 17 及以上环境运行的桌面游戏闭环，包括安全棋盘生成、翻开与标记操作、计时、状态反馈及胜负处理。开发过程进一步证明，将棋盘状态与可见图层分离能让交互规则更易梳理，而细微反馈也能为熟悉的游戏赋予独特个性。" },
        ],
      },
    },
  },
  {
    slug: "plum-b",
    year: "2025",
    status: "published",
    technologies: ["Swift", "SwiftUI", "I Ching"],
    platform: "iOS / SwiftUI",
    coverImage: { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-Ask/main/docs/images/result-page.png" },
    gallery: [
      { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-Ask/main/docs/images/input-empty.png" },
      { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-Ask/main/docs/images/input-ready.png" },
    ],
    repositoryUrl: "https://github.com/AKIIIIIIIIIII/B-PLUM-Ask",
    featured: true,
    locales: {
      en: {
        title: "B-PLUM-Ask",
        category: "Mobile App",
        summary: "A SwiftUI app that casts an I Ching hexagram from three numbers and presents the reading in a calm, legible layout.",
        coverImage: { alt: "B-PLUM-Ask hexagram reading screen", caption: "Generated hexagram reading" },
        gallery: [
          { alt: "B-PLUM-Ask before any numbers are entered", caption: "Empty input screen" },
          { alt: "B-PLUM-Ask with all three numbers entered", caption: "Completed input screen" },
        ],
        sections: [
          { id: "context", title: "Context & goal", content: "B-PLUM-Ask turns a three-number I Ching consultation into a mobile reading flow. The interface keeps the source material's structure and typographic character, but separates the short input task from the longer reading." },
          { id: "contribution", title: "My contribution", content: "I designed the product, visual system, interaction flow, typography, and SwiftUI implementation. That included the path from three numeric inputs to a result and the order in which each part of the reading appears." },
          { id: "decisions", title: "Experience & decisions", content: "The input screen contains only the three number fields and the controls needed to cast. Once the numbers are ready, the app opens a longer result view. Spacing and heading scale distinguish the judgment, commentary, moving line, and full reading without splitting them into a stack of cards." },
          { id: "implementation", title: "Implementation", content: "SwiftUI drives both the input and result screens. The three numbers generate a hexagram, then the result view presents the gua, judgment text, da xiang, tuan zhuan, moving line, and all six lines in reading order." },
          { id: "outcome", title: "Outcome & learnings", content: "The prototype starts with an empty form and ends with a readable hexagram result. I found that dense classical text did not need to be shortened for a phone screen; clearer hierarchy and more deliberate spacing were enough to make each layer easier to follow." },
        ],
      },
      ja: {
        title: "B-PLUM-Ask",
        category: "モバイルアプリ",
        summary: "3つの数字から易の卦を立て、結果を落ち着いて読める形で表示するSwiftUIアプリです。",
        coverImage: { alt: "B-PLUM-Askの占断結果画面", caption: "生成した占断結果" },
        gallery: [
          { alt: "数字を入力する前のB-PLUM-Askの画面", caption: "入力前の画面" },
          { alt: "3つの数字を入力したB-PLUM-Askの画面", caption: "卦を立てる前の入力完了画面" },
        ],
        sections: [
          { id: "context", title: "背景と目標", content: "3つの数字で卦を立てる流れを、スマートフォンで迷わず操作できる形にまとめました。原典の構成と文字の雰囲気を残しながら、入力画面と長い結果画面の役割を分けています。" },
          { id: "contribution", title: "担当したこと", content: "企画、ビジュアル、操作フロー、タイポグラフィ、SwiftUIでの実装を担当しました。3つの数字を入力してから結果を読むまでの流れと、解説項目の表示順を設計しています。" },
          { id: "decisions", title: "体験設計と判断", content: "入力画面には3つの数値欄と必要な操作だけを置き、数字がそろった後に結果画面を表示します。卦辞、解説、変爻、全体の読みは、余白と見出しの差で整理し、別々のカードには分けません。" },
          { id: "implementation", title: "実装", content: "入力画面と結果画面はSwiftUIで実装しました。3つの数値から卦を生成し、結果画面に本卦、卦辞、大象、彖伝、変爻、六爻を順番に表示します。" },
          { id: "outcome", title: "成果と学び", content: "未入力の状態から占断結果の表示まで動作するプロトタイプを実装しました。情報量の多い古典テキストでも、内容を削るのではなく、階層と余白を整えることで読みやすくできると分かりました。" },
        ],
      },
      zh: {
        title: "B-PLUM-Ask",
        category: "移动应用",
        summary: "一款 SwiftUI 应用，将三个数字的易经占问转化为安静、清晰的结果阅读体验。",
        coverImage: { alt: "B-PLUM-Ask 卦象结果页面", caption: "生成的卦象结果" },
        gallery: [
          { alt: "B-PLUM-Ask 空白输入页面", caption: "尚未输入的状态" },
          { alt: "B-PLUM-Ask 可以起卦的输入页面", caption: "准备起卦的状态" },
        ],
        sections: [
          { id: "context", title: "背景与目标", content: "B-PLUM-Ask 始于一个问题：如何把通过三个数字进行的易经占问，变成安静的移动端阅读体验，而不是信息密集的工具界面。项目希望尊重原始内容的象征结构与文字氛围，同时让用户在现代手机上从输入清晰地走向解读。" },
          { id: "contribution", title: "我的工作", content: "我独立完成了产品概念、视觉方向、交互流程、字体体系与 SwiftUI 实现，并定义了用户如何从三个数字输入进入生成结果，以及各层解读内容在屏幕上的阅读顺序。" },
          { id: "decisions", title: "体验与设计判断", content: "起卦流程刻意保持输入状态的简洁，只有三个数字准备完成后，页面才展开为较长的结果内容。通过留白、克制的字号层级和稳定的标题节奏，卦辞、解说、动爻与完整解读彼此分明，却不会变成互不相干的卡片。" },
          { id: "implementation", title: "实现方式", content: "应用使用 SwiftUI 构建输入与结果流程。三个数字生成卦象后，结果页按照结构化的阅读顺序呈现本卦、卦辞、大象、彖传、动爻与全部六爻内容。" },
          { id: "outcome", title: "成果与收获", content: "最终原型完成了从空白输入到生成可读卦象结果的完整旅程。这个项目让我确认，密集的古典内容并不需要为了效率而被压缩；谨慎的层级、间距与阅读节奏，既能保留上下文，也能让每一层内容更容易吸收。" },
        ],
      },
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectLocale(project: Project, locale: Locale) {
  return project.locales[locale];
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
