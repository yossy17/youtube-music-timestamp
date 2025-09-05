export interface I18nMessages {
  add: string;
  undo: string;
  space: string;
  copy: string;
  clear: string;
  noticeReset: string;
  copied: string;
  nothing: string;
  toggleAutoReset: string;
  toggleAutoResetButtonTitle: string;
  geniusSearchBoth: string;
  geniusSearchTitle: string;
  geniusSearchArtist: string;
  geniusSearchButtonTitle: string;
}

export const i18n: Record<string, I18nMessages> = {
  ja: {
    add: "追加",
    undo: "戻る",
    space: "スペース",
    copy: "コピー",
    clear: "削除",
    noticeReset: "次の曲を検出 {}秒後にリセットします…",
    copied: "コピーしました",
    nothing: "タイムスタンプがありません",
    toggleAutoReset: "自動リセットは無効です",
    toggleAutoResetButtonTitle: "タイムスタンプの自動リセット",
    geniusSearchBoth: "曲名とアーティストで検索",
    geniusSearchTitle: "曲名で検索",
    geniusSearchArtist: "アーティストで検索",
    geniusSearchButtonTitle: "Genius 検索",
  },
  en: {
    add: "Add",
    undo: "Undo",
    space: "Space",
    copy: "Copy",
    clear: "Clear",
    noticeReset: "Next track detected… resetting in {}s",
    copied: "Copied!",
    nothing: "No timestamps yet",
    toggleAutoReset: "Auto reset is disabled",
    toggleAutoResetButtonTitle: "Timestamp Auto Reset",
    geniusSearchBoth: "Search by song title and artist",
    geniusSearchTitle: "Search by song title",
    geniusSearchArtist: "Search by song artist",
    geniusSearchButtonTitle: "Genius Search",
  },
  "zh-CN": {
    add: "添加",
    undo: "撤销",
    space: "空格",
    copy: "复制",
    clear: "删除",
    noticeReset: "检测到下一首 {}秒后重置…",
    copied: "已复制！",
    nothing: "没有时间戳",
    toggleAutoReset: "自动重置已禁用",
    toggleAutoResetButtonTitle: "时间戳自动重置",
    geniusSearchBoth: "按标题和歌手搜索",
    geniusSearchTitle: "按标题搜索",
    geniusSearchArtist: "按歌手搜索",
    geniusSearchButtonTitle: "Genius 搜索",
  },
  ko: {
    add: "추가",
    undo: "뒤로",
    space: "공백",
    copy: "복사",
    clear: "삭제",
    noticeReset: "다음 곡 감지… {}초 후 초기화",
    copied: "복사했습니다!",
    nothing: "타임스탬프가 없습니다",
    toggleAutoReset: "자동 재설정이 비활성화되었습니다",
    toggleAutoResetButtonTitle: "타임스탬프 자동 재설정",
    geniusSearchBoth: "제목과 아티스트로 검색",
    geniusSearchTitle: "제목으로 검색",
    geniusSearchArtist: "아티스트로 검색",
    geniusSearchButtonTitle: "Genius 검색",
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
