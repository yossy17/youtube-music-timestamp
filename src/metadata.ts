export const metadata = {
  name: {
    en: "YouTube Music Timestamp",
    ja: "YouTube Music タイムスタンプ",
    "zh-CN": "YouTube Music 时间戳",
    ko: "Youtube Music 타임스탬프",
  },
  description: {
    en: "Easily add timestamps in YouTube Music and automatically create '.LRC' files",
    ja: "Youtube Musicで.LRCファイルを簡単に作ることができます",
    "zh-CN": "您可以在 YouTube Music 中轻松添加时间戳，并自动生成“.LRC”文件",
    ko: "YouTube Music에서 손쉽게 타임스탬프를 추가하고 '.LRC' 파일을 자동으로 생성할 수 있습니다",
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
  license: "GPL",
};

export default metadata;
