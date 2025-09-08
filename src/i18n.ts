export interface I18nMessages {
  add: string;
  space: string;
  undo: string;
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
  chatgptPrompt: string[];
  chatgptPromptButtonTitle: string;
  closeButtonTitle: string;
}

export const i18n: Record<string, I18nMessages> = {
  ja: {
    add: "追加",
    space: "スペース",
    undo: "戻る",
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
    chatgptPrompt: [
      "全ての時間に歌詞を対応させた完成版LRCファイルを出してください。",
      "時間と歌詞の間には半角スペースを入れてください。",
      "各行の最後はスペース要素がないようにしてください。",
      "[Verse 1]や[Chorus]や最初にタイトルなどの要素がある場合、その要素は無視してください。",
      "歌の構成(例: サビやAメロなど)で改行されている場所は、そのまま改行して出力してください。",
      "LRCファイルを出した後、[Verse 1]や[Chorus]や最初にタイトルなどの要素を消したプレーンな歌詞を出してください。",
      "もし行数が合わないやどちらかが空の行があった場合教えてください。",
    ],
    chatgptPromptButtonTitle: "ChatGPT プロンプト",
    closeButtonTitle: "閉じる",
  },
  en: {
    add: "Add",
    space: "Space",
    undo: "Undo",
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
    chatgptPrompt: [
      "Please generate a completed LRC file with all timestamps aligned to the lyrics.",
      "Insert a half-width space between the time and the lyrics.",
      "Ensure there are no trailing spaces at the end of each line.",
      "Ignore elements such as [Verse 1], [Chorus], or any titles at the beginning.",
      "Preserve line breaks where the song structure (such as verses or choruses) is separated.",
      "After outputting the LRC file, also provide the plain lyrics with those elements removed.",
      "If the number of lines does not match or if there are any empty lines, please let me know.",
    ],
    chatgptPromptButtonTitle: "ChatGPT Prompt",
    closeButtonTitle: "Close",
  },
  "zh-CN": {
    add: "添加",
    space: "空格",
    undo: "撤销",
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
    chatgptPrompt: [
      "请生成一个完整的 LRC 文件，并使所有时间与歌词对应。",
      "在时间和歌词之间插入半角空格。",
      "确保每行末尾没有空格字符。",
      "忽略 [Verse 1]、[Chorus] 或开头的标题等元素。",
      "在歌曲结构(如段落或副歌)换行的地方保持换行。",
      "在输出 LRC 文件后，请再输出删除这些元素的纯歌词。",
      "如果行数不匹配或有空行，请告诉我。",
    ],
    chatgptPromptButtonTitle: "ChatGPT 提示词",
    closeButtonTitle: "关闭",
  },
  ko: {
    add: "추가",
    space: "공백",
    undo: "뒤로",
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
    chatgptPrompt: [
      "모든 시간에 가사를 맞춘 완성된 LRC 파일을 만들어 주세요.",
      "시간과 가사 사이에는 반각 공백을 넣어 주세요.",
      "각 줄 끝에는 공백 문자가 없도록 해 주세요.",
      "[Verse 1], [Chorus] 또는 제목과 같은 요소는 무시해 주세요.",
      "노래 구조(예: 절, 후렴)로 줄바꿈된 곳은 그대로 줄바꿈해 주세요.",
      "LRC 파일을 출력한 후, 이러한 요소를 제거한 일반 가사도 함께 출력해 주세요.",
      "줄 수가 맞지 않거나 빈 줄이 있으면 알려 주세요.",
    ],
    chatgptPromptButtonTitle: "ChatGPT 프롬프트",
    closeButtonTitle: "닫다",
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
