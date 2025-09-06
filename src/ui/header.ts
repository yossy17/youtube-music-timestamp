import { createChatgptButton } from "./header/chatgptButton";
import { createTitle } from "./header/title";
import { createCloseButton } from "./header/closeButton";

export const createHeader = (
  onDragStart: (e: MouseEvent) => void,
  onClose: () => void
): HTMLElement => {
  const header = document.createElement("div");
  header.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 8px;
    cursor: grab;
    position: relative;
    padding-block: 12px;
  `;

  const chatgpt = createChatgptButton();
  const title = createTitle();
  const close = createCloseButton(onClose);

  header.append(chatgpt, title, close);

  header.addEventListener("mousedown", onDragStart);

  return header;
};
