import { createTitle } from "./header/title";
import { createMediaButton } from "./header/mediaButton";
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
    position: relative;
    padding-block: 12px;
  `;

  const title = createTitle();
  const media = createMediaButton();
  const close = createCloseButton(onClose);

  header.append(title, media, close);

  title.addEventListener("mousedown", onDragStart);

  return header;
};
