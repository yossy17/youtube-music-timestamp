import { messages } from "../../i18n";

export const createCloseButton = (onClose: () => void): HTMLElement => {
  // Close ボタン
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.title = messages.closeButtonTitle;
  closeBtn.textContent = "×";
  closeBtn.style.cssText = `
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s;
  `;
  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.background = "rgba(255,255,255,0.2)";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.background = "rgba(255,255,255,0.08)";
  });
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  });

  return closeBtn;
};
