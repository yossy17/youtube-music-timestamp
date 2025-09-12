import { messages } from "../../i18n";

export const createListBox = (): HTMLElement => {
  const listBox = document.createElement("div");
  listBox.style.cssText = `
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 12px;
    height: 140px;
    overflow-y: auto;
    white-space: pre-wrap;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    line-height: 1.5;
    user-select: text;
    backdrop-filter: blur(8px);
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 4px 12px inset,
      rgba(255, 255, 255, 0.02) 0px 1px 0px;
    color: rgb(200, 200, 210);
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 0, 51, 0.4) transparent;
  `;
  return listBox;
};

export const updateListBox = (listBox: HTMLElement, timestamps: string[]) => {
  const content = timestamps.length ? timestamps.join("\n") : messages.nothing;
  listBox.textContent = content;
};

// 行数をカウント
const countLines = (text: string): number[] => {
  if (!text.trim()) return [];

  // 空行で区切る
  const blocks = text.split(/\n(?:\s*\n)+/).filter((block) => block.trim());

  // 各ブロックの非空行数をカウント
  return blocks.map((block) => {
    return block.split("\n").filter((line) => line.trim()).length;
  });
};

// Notice表示を10個まで制限
const formatNoticeDisplay = (lineCounts: number[]): string => {
  const LINE_COUNTS = 10;

  if (lineCounts.length === 0) return "";

  if (lineCounts.length <= LINE_COUNTS) {
    return lineCounts.join(" ");
  }

  const visibleCounts = lineCounts.slice(-LINE_COUNTS);
  return "... " + visibleCounts.join(" ");
};

// 行数カウント機能付きの更新関数
export const updateListBoxNotice = (
  listBox: HTMLElement,
  timestamps: string[],
  noticeWrapper: {
    setMessage: (msg: string) => void;
    clear: () => void;
    setDefault?: (msg: string) => void;
  }
) => {
  const content = timestamps.length ? timestamps.join("\n") : messages.nothing;
  listBox.textContent = content;

  // Notice更新
  if (timestamps.length > 0) {
    const lineCounts = countLines(content);
    const display = formatNoticeDisplay(lineCounts);

    // 新しいsetDefaultメソッドがある場合はそれを使用、なければ従来通り
    if (noticeWrapper.setDefault) {
      noticeWrapper.setDefault(display);
    } else {
      noticeWrapper.setMessage(display);
    }
  } else {
    if (noticeWrapper.setDefault) {
      noticeWrapper.setDefault("");
    } else {
      noticeWrapper.clear();
    }
  }

  // 新しいコンテンツが追加された時に自動スクロール
  listBox.scrollTop = listBox.scrollHeight;
};
