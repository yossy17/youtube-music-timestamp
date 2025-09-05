import { messages } from "../i18n";

export interface ButtonActions {
  onAdd: () => void;
  onUndo: () => void;
  onSpace: () => void;
  onCopy: () => void;
  onClear: () => void;
}

const makeBtn = (text: string, shortcut: string): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = `${text} ${shortcut}`;

  button.style.cssText = `
    flex: 1 1 auto;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.06);
    color: rgb(240, 240, 245);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 11px;
    backdrop-filter: blur(10px);
    box-shadow:
      rgba(0, 0, 0, 0.3) 0px 4px 12px,
      rgba(255, 255, 255, 0.03) 0px 1px 0px inset;
  `;
  button.addEventListener("mouseenter", () => {
    button.style.background = "rgba(255, 255, 255, 0.12)";
    button.style.borderColor = "rgba(255, 255, 255, 0.2)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = "rgba(255, 255, 255, 0.06)";
    button.style.borderColor = "transparent";
  });
  return button;
};

export const createButtons = (actions: ButtonActions): HTMLElement => {
  const buttons = document.createElement("div");
  buttons.style.cssText = `
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  `;

  const addBtn = makeBtn(messages.add, "(1)");
  const undoBtn = makeBtn(messages.undo, "(2)");
  const spaceBtn = makeBtn(messages.space, "(3)");
  const copyBtn = makeBtn(messages.copy, "(4)");
  const clearBtn = makeBtn(messages.clear, "(5)");

  addBtn.addEventListener("click", actions.onAdd);
  undoBtn.addEventListener("click", actions.onUndo);
  spaceBtn.addEventListener("click", actions.onSpace);
  copyBtn.addEventListener("click", actions.onCopy);
  clearBtn.addEventListener("click", actions.onClear);

  buttons.append(addBtn, undoBtn, spaceBtn, copyBtn, clearBtn);
  return buttons;
};
