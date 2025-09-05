export interface I18nMessages {
  add: string;
  undo: string;
  space: string;
  copy: string;
  clear: string;
  noticeReset: string;
  copied: string;
  nothing: string;
}

export const i18n: Record<string, I18nMessages> = {
  ja: {
    add: "追加 (1)",
    undo: "戻る (2)",
    space: "スペース (3)",
    copy: "コピー (4)",
    clear: "削除 (5)",
    noticeReset: "次の曲を検出。{}秒後にリセットします…",
    copied: "コピーしました。",
    nothing: "タイムスタンプがありません。",
  },
  en: {
    add: "Add (1)",
    undo: "Undo (2)",
    space: "Space (3)",
    copy: "Copy (4)",
    clear: "Clear (5)",
    noticeReset: "Next track detected… resetting in {}s",
    copied: "Copied!",
    nothing: "No timestamps yet.",
  },
  "zh-CN": {
    add: "添加 (1)",
    undo: "撤销 (2)",
    space: "空格 (3)",
    copy: "复制 (4)",
    clear: "删除 (5)",
    noticeReset: "检测到下一首，{}秒后重置…",
    copied: "已复制！",
    nothing: "没有时间戳。",
  },
  ko: {
    add: "추가 (1)",
    undo: "뒤로 (2)",
    space: "공백 (3)",
    copy: "복사 (4)",
    clear: "삭제 (5)",
    noticeReset: "다음 곡 감지… {}초 후 초기화",
    copied: "복사했습니다!",
    nothing: "타임스탬프가 없습니다.",
  },
};

// ブラウザの言語設定から言語を取得
export function detectLanguage(): keyof typeof i18n {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang.startsWith("ja")) return "ja";
  if (browserLang.startsWith("zh")) return "zh-CN";
  if (browserLang.startsWith("ko")) return "ko";
  return "en";
}

export const currentLang = detectLanguage();
export const messages = i18n[currentLang];
