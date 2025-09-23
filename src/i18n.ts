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
      "全てのタイムスタンプと歌詞を対応させた完成版LRCを作成してください｡",
      "歌詞の[Verse 1]や[Chorus]､タイトル､見出し､装飾記号(e.g. ---､***）などの不要な要素は無視してください｡",
      "出力前に必ず､` (ytm-space)`以外のタイムスタンプの数と不要な要素を無視した歌詞の行数が一致しているか確認し､以下のフォーマットで出力してください｡",
      "【フォーマット】",
      "最初に完成版LRCファイルをコードブロックとして出力してください｡",
      "` (ytm-space)` があるタイムスタンプは ` (ytm-space)` のテキストのみ削除し､歌詞が空のままタイムスタンプは残してください｡",
      "タイムスタンプと歌詞の間には半角スペースを入れ､各行の先頭・末尾には空白を残さないでください｡",
      "次に、無駄な要素を削除したプレーンな歌詞をコードブロックとして出力してください｡",
      "プレーンな歌詞を作成するときは､歌の構成で改行されている場所は､それに準じてそのまま改行してください｡",
      "歌詞の言語は変更せず、そのまま出力してください｡",
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
      "Generate a completed LRC file that aligns all timestamps with the lyrics.",
      "Ignore unnecessary elements such as [Verse 1], [Chorus], titles, headings, and decorative symbols (e.g., ---, ***).",
      "Before output, make sure that the number of timestamps (excluding ` (ytm-space)`) matches the number of lyric lines after removing unnecessary elements.",
      "【Format】",
      "First, output the completed LRC file inside a code block.",
      "For timestamps with ` (ytm-space)`, remove only the text ` (ytm-space)` and keep the timestamp line empty.",
      "Insert a half-width space between the timestamp and the lyrics, and do not leave spaces at the beginning or end of each line.",
      "Next, output the plain lyrics (with unnecessary elements removed) inside a code block.",
      "When creating the plain lyrics, follow the line breaks as they appear in the song structure.",
      "Do not change the language of the lyrics; output them as-is.",
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
      "请生成一个完整的 LRC 文件，使所有时间戳与歌词对应。",
      "忽略不必要的元素，如 [Verse 1]、[Chorus]、标题、段落标题以及装饰符号（例如 ---、***）。",
      "在输出前，请确认去除不必要元素后的歌词行数与时间戳数量（不包括 ` (ytm-space)`) 一致。",
      "【格式】",
      "首先，将完成的 LRC 文件放在代码块中输出。",
      "对于包含 ` (ytm-space)` 的时间戳，只需删除 ` (ytm-space)` 文本，保留空的时间戳行。",
      "时间戳与歌词之间请使用半角空格分隔，并且不要在每行的开头或结尾留下空格。",
      "接着，将去除多余元素后的纯歌词放在代码块中输出。",
      "在生成纯歌词时，请保持歌曲原有结构中的换行格式。",
      "不要更改歌词的语言，保持原样输出。",
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
      "모든 타임스탬프와 가사가 일치하도록 완성된 LRC 파일을 생성하세요.",
      "[Verse 1], [Chorus], 제목, 소제목, 장식 기호(예: ---, ***) 등 불필요한 요소는 무시하세요.",
      "출력 전에 ` (ytm-space)`을 제외한 타임스탬프 개수와 불필요한 요소를 제거한 가사 줄 수가 일치하는지 반드시 확인하세요.",
      "【형식】",
      "먼저, 완성된 LRC 파일을 코드 블록으로 출력하세요.",
      "` (ytm-space)`이 포함된 타임스탬프의 경우 ` (ytm-space)` 텍스트만 삭제하고, 가사가 없는 빈 줄로 남겨 두세요.",
      "타임스탬프와 가사 사이에는 반각 스페이스를 넣고, 각 행의 처음이나 끝에는 공백을 두지 마세요.",
      "그다음, 불필요한 요소를 제거한 순수 가사를 코드 블록으로 출력하세요.",
      "순수 가사를 만들 때는 노래 구조에 따른 줄바꿈을 그대로 유지하세요.",
      "가사의 언어는 변경하지 말고, 원문 그대로 출력하세요.",
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
