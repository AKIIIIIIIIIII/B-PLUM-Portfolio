export const locales = ["en", "ja", "zh"] as const;

export type Locale = (typeof locales)[number];

export const localeStorageKey = "b-plum-locale";

export const localeConfig: Record<Locale, { label: string; compactLabel: string; htmlLang: string; ogLocale: string }> = {
  en: { label: "EN", compactLabel: "EN", htmlLang: "en", ogLocale: "en_US" },
  ja: { label: "日本語", compactLabel: "JP", htmlLang: "ja", ogLocale: "ja_JP" },
  zh: { label: "中文", compactLabel: "中", htmlLang: "zh-CN", ogLocale: "zh_CN" },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function detectLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(localeStorageKey);
    const savedLocale = saved ?? undefined;
    if (isLocale(savedLocale)) return savedLocale;
  } catch {
    // Storage may be unavailable in privacy-restricted contexts.
  }

  const languages = typeof navigator === "undefined" ? [] : navigator.languages?.length > 0 ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const normalized = language.toLowerCase();
    if (normalized.startsWith("ja")) return "ja";
    if (normalized.startsWith("zh")) return "zh";
    if (normalized.startsWith("en")) return "en";
  }
  return "en";
}

export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Navigation should still work when storage is unavailable.
  }
}

export function localizePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments[0] = locale;
  else segments.unshift(locale);
  return `/${segments.join("/")}`;
}

export interface SiteCopy {
  nav: { about: string; works: string; contact: string; primary: string; language: string; openMenu: string; closeMenu: string; home: string };
  hero: { body: string; archive: string; imageAlt: string };
  about: {
    eyebrow: string;
    title: string;
    accent: string;
    statementStart: string;
    statementAccent: string;
    statementEnd: string;
    body: string;
    projects: string;
    experienceValue: string;
    experience: string;
    imageAlt: string;
  };
  works: { eyebrow: string; title: string; accent: string; github: string; viewProject: string; comingSoon: string };
  quote: string;
  contact: { eyebrow: string; heading: string; accent: string; crafted: string; portfolio: string };
  project: {
    back: string;
    caseStudy: string;
    sectionsNav: string;
    platform: string;
    stack: string;
    status: string;
    published: string;
    inProgress: string;
    comingSoon: string;
    repository: string;
    live: string;
    previous: string;
    next: string;
    nextLabel: string;
    allWorks: string;
    interfaceFrames: string;
  };
  notFound: { label: string; title: string; body: string; home: string };
  seo: { homeTitle: string; homeDescription: string; notFoundTitle: string };
}

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    nav: { about: "About", works: "Works", contact: "Contact", primary: "Primary navigation", language: "Language", openMenu: "Open menu", closeMenu: "Close menu", home: "b-plum home" },
    hero: { body: "b-plum is a collection of projects shaped by my everyday reflections and programming practice. I explore new digital landscapes where stillness and functionality resonate.", archive: "Enter Archive", imageAlt: "Abstract architectural light and shadow" },
    about: { eyebrow: "About Me", title: "A space", accent: "for ideas.", statementStart: "Code with", statementAccent: "warmth", statementEnd: ".", body: "b-plum is a space for my digital experiments and creative work. I do not see web applications as mere collections of tools, but as spaces where a maker's thinking meets the people who use them.", projects: "Personal Projects", experienceValue: "1 year", experience: "Dev Experience", imageAlt: "Portrait of the creator of b-plum" },
    works: { eyebrow: "Personal Projects", title: "Selected", accent: "projects.", github: "Check GitHub", viewProject: "View Project", comingSoon: "Coming Soon" },
    quote: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
    contact: { eyebrow: "Contact", heading: "Keep", accent: "In Touch.", crafted: "Crafting with passion", portfolio: "Personal Portfolio" },
    project: { back: "Back to projects", caseStudy: "Case study", sectionsNav: "Project sections", platform: "Platform", stack: "Technology", status: "Status", published: "Published", inProgress: "In progress", comingSoon: "Coming soon", repository: "View repository", live: "Open project", previous: "Previous project", next: "Next project", nextLabel: "Next project", allWorks: "View all projects", interfaceFrames: "Interface frames" },
    notFound: { label: "404 / Not found", title: "Quietly missing.", body: "This page could not be found.", home: "Return home" },
    seo: { homeTitle: "b-plum — Silent Narrative.", homeDescription: "A portfolio of personal projects where thoughtful programming, quiet visual design, and practical digital experiences meet.", notFoundTitle: "Page not found — b-plum" },
  },
  ja: {
    nav: { about: "私について", works: "作品", contact: "連絡先", primary: "メインナビゲーション", language: "言語", openMenu: "メニューを開く", closeMenu: "メニューを閉じる", home: "b-plum ホーム" },
    hero: { body: "b-plumは、日々の思索とプログラミングをかたちにしたプロジェクト集です。静けさと機能性が響き合う、新しいデジタルの風景を探求しています。", archive: "作品を見る", imageAlt: "建築空間に差し込む抽象的な光と影" },
    about: { eyebrow: "私について", title: "アイデアのための", accent: "余白。", statementStart: "コードで、", statementAccent: "体温", statementEnd: "を届ける。", body: "b-plumは、私のデジタルな実験と創造の場です。ウェブアプリは単なるツールの集まりではなく、作り手の思索が使う人と交差する「空間」だと考えています。", projects: "個人プロジェクト", experienceValue: "1年", experience: "開発経験", imageAlt: "b-plum制作者のポートレート" },
    works: { eyebrow: "個人プロジェクト", title: "選び抜いた", accent: "作品。", github: "GitHubを見る", viewProject: "作品を見る", comingSoon: "近日公開" },
    quote: "完璧とは、これ以上加えるものがない状態ではなく、これ以上削るものがない状態のことである。",
    contact: { eyebrow: "連絡先", heading: "つながりを、", accent: "これからも。", crafted: "情熱を込めて制作", portfolio: "個人ポートフォリオ" },
    project: { back: "作品一覧へ戻る", caseStudy: "ケーススタディ", sectionsNav: "プロジェクトの各章", platform: "プラットフォーム", stack: "使用技術", status: "ステータス", published: "公開中", inProgress: "制作中", comingSoon: "近日公開", repository: "リポジトリを見る", live: "プロジェクトを開く", previous: "前の作品", next: "次の作品", nextLabel: "次の作品", allWorks: "すべての作品を見る", interfaceFrames: "インターフェース画面" },
    notFound: { label: "404 / 見つかりません", title: "静かに、見失いました。", body: "お探しのページは見つかりませんでした。", home: "ホームへ戻る" },
    seo: { homeTitle: "b-plum — Silent Narrative.", homeDescription: "思索を重ねたプログラミングと静かなビジュアルデザインが出会う、個人プロジェクトのポートフォリオ。", notFoundTitle: "ページが見つかりません — b-plum" },
  },
  zh: {
    nav: { about: "关于", works: "作品", contact: "联系", primary: "主导航", language: "语言", openMenu: "打开菜单", closeMenu: "关闭菜单", home: "b-plum 首页" },
    hero: { body: "b-plum 是一组由日常思考与编程实践凝结而成的个人项目。我在这里探索安静与功能彼此共鸣的数字风景。", archive: "进入作品集", imageAlt: "建筑空间中抽象的光影" },
    about: { eyebrow: "关于我", title: "一处容纳", accent: "想法的空间。", statementStart: "用代码传递", statementAccent: "温度", statementEnd: "。", body: "b-plum 是我进行数字实验与创作的空间。对我而言，网页应用并不只是工具的集合，而是创作者的思考与使用者相遇的“场所”。", projects: "个人项目", experienceValue: "1 年", experience: "开发经验", imageAlt: "b-plum 创作者肖像" },
    works: { eyebrow: "个人项目", title: "精选", accent: "作品。", github: "查看 GitHub", viewProject: "查看项目", comingSoon: "即将发布" },
    quote: "完美，不是无可复加，而是无可删减。",
    contact: { eyebrow: "联系", heading: "保持", accent: "联系。", crafted: "以热爱持续创作", portfolio: "个人作品集" },
    project: { back: "返回作品列表", caseStudy: "项目案例", sectionsNav: "项目章节", platform: "平台", stack: "技术栈", status: "状态", published: "已发布", inProgress: "进行中", comingSoon: "即将发布", repository: "查看代码仓库", live: "打开项目", previous: "上一个项目", next: "下一个项目", nextLabel: "下一个项目", allWorks: "查看全部项目", interfaceFrames: "界面展示" },
    notFound: { label: "404 / 页面不存在", title: "这里安静地缺了一页。", body: "没有找到你要访问的页面。", home: "返回首页" },
    seo: { homeTitle: "b-plum — Silent Narrative.", homeDescription: "一个汇集个人项目的作品集，让审慎的编程、安静的视觉设计与实用的数字体验在此相遇。", notFoundTitle: "页面不存在 — b-plum" },
  },
};
