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
  `;
  return listBox;
};

export const updateListBox = (listBox: HTMLElement, timestamps: string[]) => {
  listBox.textContent = timestamps.length
    ? timestamps.join("\n")
    : messages.nothing;

  // 新しいコンテンツが追加された時に自動スクロール
  listBox.scrollTop = listBox.scrollHeight;
};
