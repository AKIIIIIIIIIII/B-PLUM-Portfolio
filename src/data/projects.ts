import type { Locale } from "../i18n";
import type { Project } from "../types/project";

export const projects: Project[] = [
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
        title: "Easy Cat Minesweeper",
        category: "Mini Game",
        summary: "A Java Swing desktop game that layers a small cat-themed visual experience onto the familiar rhythm of Minesweeper.",
        coverImage: { alt: "Easy Cat Minesweeper game interface with cat-themed visuals", caption: "Playable desktop interface" },
        sections: [
          { id: "context", title: "Context & goal", content: "Easy Cat Minesweeper began as an independent desktop experiment: rebuild the familiar Minesweeper loop in Java Swing while making the experience feel more approachable through cat-themed imagery and gentle visual feedback. The goal was a compact, playable game that preserves the rules players already understand without inheriting the severity of a traditional system interface." },
          { id: "contribution", title: "My contribution", content: "I independently shaped the concept, visual direction, interaction behavior, game rules, and Java Swing implementation. I also organized the source into focused units for the window, board layers, mine generation, number calculation, shared state, and interface settings." },
          { id: "decisions", title: "Experience & decisions", content: "The first click is always safe so a new round begins without an arbitrary loss. Left-click opens a tile, right-click places or removes a mark, and hover and pressed states make the board respond clearly to every action. A compact status panel keeps the remaining marks, elapsed time, and current game state visible without interrupting play." },
          { id: "implementation", title: "Implementation", content: "`Minesweeper_Win` creates the Swing window and handles mouse events, while `MapTop` and `MapBottom` separate the visible tile layer from the underlying minefield. `BottomCat` generates mines, `Num` calculates nearby mine counts, and `GameUtil` centralizes shared state, images, constants, and UI settings." },
          { id: "outcome", title: "Outcome & learnings", content: "The result is a complete playable desktop loop for JDK 17+, including safe board generation, opening and marking interactions, timing, status feedback, and win or loss handling. Building it reinforced how separating board state from the visible layer makes interaction rules easier to reason about, and how small feedback states can give a familiar game a distinct character." },
        ],
      },
      ja: {
        title: "Easy Cat Minesweeper",
        category: "ミニゲーム",
        summary: "おなじみのマインスイーパーに、猫をモチーフにした小さな世界観を重ねたJava Swing製デスクトップゲーム。",
        coverImage: { alt: "猫をモチーフにしたEasy Cat Minesweeperのゲーム画面", caption: "実際に遊べるデスクトップ画面" },
        sections: [
          { id: "context", title: "背景と目標", content: "Easy Cat Minesweeperは、慣れ親しんだマインスイーパーの遊びをJava Swingで組み直し、猫のビジュアルと穏やかなフィードバックによって親しみやすい体験にできないか、という個人実験から始まりました。既知のルールはそのままに、従来のシステム画面が持つ硬さを取り除いた、コンパクトで遊べるゲームを目指しました。" },
          { id: "contribution", title: "担当したこと", content: "コンセプト、ビジュアルの方向性、操作感、ゲームルール、Java Swingでの実装まで、すべてを個人で設計・開発しました。ソースコードは、ウィンドウ、盤面レイヤー、地雷生成、数字計算、共有状態、画面設定という役割ごとに整理しています。" },
          { id: "decisions", title: "体験設計と判断", content: "最初の一手で不意に負けないよう、初回クリックは必ず安全にしました。左クリックでマスを開き、右クリックで印を付け外しでき、ホバーや押下状態によって操作への反応も明確にしています。残りの印、経過時間、ゲーム状態は小さなステータス領域にまとめ、プレイを妨げず確認できるようにしました。" },
          { id: "implementation", title: "実装", content: "`Minesweeper_Win`がSwingウィンドウとマウスイベントを担い、`MapTop`と`MapBottom`が見えるマスの層と内部の地雷原を分離します。`BottomCat`が地雷を生成し、`Num`が周囲の地雷数を計算、`GameUtil`が共有状態、画像、定数、UI設定を一元管理します。" },
          { id: "outcome", title: "成果と学び", content: "JDK 17以上で動作し、安全な盤面生成、マスを開く・印を付ける操作、計時、状態表示、勝敗判定までを備えた一連のデスクトップゲームとして完成しました。盤面の状態と表示レイヤーを分けることで操作ルールを整理しやすくなること、そして小さな反応の積み重ねが定番ゲームにも固有の表情を与えることを学びました。" },
        ],
      },
      zh: {
        title: "Easy Cat Minesweeper",
        category: "迷你游戏",
        summary: "一款使用 Java Swing 制作的桌面游戏，在熟悉的扫雷节奏中加入轻巧的猫咪主题视觉体验。",
        coverImage: { alt: "带有猫咪主题视觉的 Easy Cat Minesweeper 游戏界面", caption: "可实际游玩的桌面界面" },
        sections: [
          { id: "context", title: "背景与目标", content: "Easy Cat Minesweeper 起源于一次独立的桌面开发实验：用 Java Swing 重做熟悉的扫雷循环，并借助猫咪主题图像和柔和的视觉反馈，让体验更容易亲近。目标是做出一款小巧而完整的游戏，在保留玩家熟悉规则的同时，摆脱传统系统界面的生硬感。" },
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
        summary: "A SwiftUI app that turns a three-number I Ching consultation into a quiet, readable result experience.",
        coverImage: { alt: "B-PLUM-Ask hexagram result screen", caption: "Generated hexagram result" },
        gallery: [
          { alt: "B-PLUM-Ask empty input screen", caption: "Empty input state" },
          { alt: "B-PLUM-Ask ready-to-cast input screen", caption: "Ready-to-cast state" },
        ],
        sections: [
          { id: "context", title: "Context & goal", content: "B-PLUM-Ask began with the question of how a three-number I Ching consultation could become a calm mobile reading experience rather than a dense utility screen. The goal was to respect the symbolic structure and typographic atmosphere of the source material while making the path from input to interpretation clear on a contemporary phone." },
          { id: "contribution", title: "My contribution", content: "I independently developed the product concept, visual direction, interaction flow, typographic system, and SwiftUI implementation. I defined how users move from three numeric inputs to a generated result and how each layer of the reading is ordered on screen." },
          { id: "decisions", title: "Experience & decisions", content: "The casting flow keeps the input state deliberately minimal, then opens into a longer result page only after the three numbers are ready. Whitespace, restrained type scales, and a steady heading rhythm separate the judgment, commentary, moving line, and full reading without turning them into disconnected cards." },
          { id: "implementation", title: "Implementation", content: "The app uses SwiftUI to build the input and result flows. Three numeric inputs generate a hexagram, after which the result view presents the gua, judgment text, da xiang, tuan zhuan, moving line, and all six lines in a structured reading sequence." },
          { id: "outcome", title: "Outcome & learnings", content: "The resulting prototype completes the journey from an empty input state to a generated, readable hexagram result. The project showed that dense classical content does not need to be compressed to feel efficient: careful hierarchy, spacing, and pacing can preserve context while making each layer easier to absorb." },
        ],
      },
      ja: {
        title: "B-PLUM-Ask",
        category: "モバイルアプリ",
        summary: "3つの数字による易の占断を、静かで読みやすい結果体験へと変えるSwiftUIアプリ。",
        coverImage: { alt: "B-PLUM-Askの卦の結果画面", caption: "生成された卦の結果" },
        gallery: [
          { alt: "B-PLUM-Askの未入力画面", caption: "未入力の状態" },
          { alt: "B-PLUM-Askの占断準備完了画面", caption: "占断できる状態" },
        ],
        sections: [
          { id: "context", title: "背景と目標", content: "B-PLUM-Askは、3つの数字で行う易の占断を、情報が詰まった道具的な画面ではなく、落ち着いて読めるモバイル体験にできないかという問いから始まりました。原典が持つ象徴の構造と文字の空気感を尊重しながら、入力から解釈までの道筋を現代のスマートフォン上で明快にすることを目指しました。" },
          { id: "contribution", title: "担当したこと", content: "プロダクトの構想、ビジュアルの方向性、操作フロー、タイポグラフィ体系、SwiftUIでの実装まで、すべてを個人で設計・開発しました。3つの数値入力から結果へ進む流れと、読みの各層を画面上でどの順序に並べるかを定義しています。" },
          { id: "decisions", title: "体験設計と判断", content: "占断前の入力画面は意図的に最小限に抑え、3つの数字がそろって初めて長い結果画面へ開く構成にしました。余白、控えめな文字サイズの差、一定の見出しリズムによって、卦辞、解説、変爻、全体の読みを切り分けつつ、断片的なカードの集まりには見せないようにしています。" },
          { id: "implementation", title: "実装", content: "入力と結果のフローはSwiftUIで構築しています。3つの数値から卦を生成し、結果画面では卦、卦辞、大象、彖伝、変爻、六爻すべてを、ひと続きの読書体験として順序立てて表示します。" },
          { id: "outcome", title: "成果と学び", content: "空の入力状態から卦を生成し、読みやすい結果へ至る一連のプロトタイプが完成しました。古典の密度を効率のために削る必要はなく、階層、余白、読む速度を丁寧に設計すれば、文脈を保ったまま各層を理解しやすくできると分かりました。" },
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
