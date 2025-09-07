export const metadata = {
  name: {
    en: "YouTube Music Timestamp",
    ja: "YouTube Music タイムスタンプ",
    "zh-CN": "YouTube 音乐时间戳",
    ko: "유튜브 뮤직 타임스탬프",
  },
  description: {
    en: "Capture and manage timestamps in YouTube Music",
    ja: "YouTube Music でタイムスタンプを記録・管理する",
    "zh-CN": "在 YouTube Music 中捕获和管理时间戳",
    ko: "YouTube Music에서 타임스탬프를 기록하고 관리",
  },
  version: "0.0.0",
  author: "Yos_sy",
  match: ["*://music.youtube.com/*"],
  namespace: "http://tampermonkey.net/",
  icon: "https://yossy17.github.io/youtube-music-timestamp/images/icons/normal/icon-48.webp",
  grant: [
    "GM_setClipboard",
    "GM_registerMenuCommand",
    "GM_setValue",
    "GM_getValue",
    "GM_addStyle",
  ],
  license: "MIT",
};

export default metadata;
