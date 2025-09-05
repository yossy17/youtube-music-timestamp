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
  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUVBMVEVHcEz/ADP/ADP/ADP/ADP/ADP/ADP/ADP/ADP/ADP/ADL/////KlX/DD3/GUf/wc3/tcT/eJP/WHn/ydT/P2X/7fH/nrH/prj/3eP/g5z/orU7aniKAAAACnRSTlMArhtu7wLENt2SyxIIrQAAATxJREFUeNqFU1mWgyAQxC0qdLOjkPsfdFiiSDI+6wOfdFG9kxPTPHTLSOm4dMM8ndfVvC70xLJ+U/p1pA3Gtb/a5xf9wWu+2Bf6D5b5144cgOM3oz/0QUkRIRUcXvoc//p5rcymgXPQm1EflXVKDkr8fJc2sgCizcqdl1zmUwD3d7oLzoXEfu/4kTgiVJJnN85FeaRcqiPOocRnbDy1cIw5sW1IrSmRDqQrAluyO1aQ9Lci0ZHsAaWOKp5JkwkeIlti9kHGnIKIV4E5C4URIl3wnAeJR/lDwZgB2BNBYH6TcCGYZOHcx4+phOoCRXorlU8nVhc1yMBOhBrkJU3wh91DTbMWqtbBaVoL1ZTaylTJ1LRa6rZZaLW22DSrbXdG2+7ngXkeueehJdPT2JPpZnGmh9Vrcbe81c3N+v8BqrEmmUM9lVUAAAAASUVORK5CYII=",
  grant: [
    "GM_setClipboard",
    "GM_registerMenuCommand",
    "GM_setValue",
    "GM_getValue",
  ],
  license: "MIT",
};

export default metadata;
