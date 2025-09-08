import { messages } from "../i18n";

export interface ButtonActions {
  onAdd: () => void;
  onSpace: () => void;
  onUndo: () => void;
  onCopy: () => void;
  onClear: () => void;
}

const makeButton = (text: string, shortcut: string): HTMLButtonElement => {
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

  const addButton = makeButton(messages.add, "(1)");
  const spaceButton = makeButton(messages.space, "(2)");
  const undoButton = makeButton(messages.undo, "(3)");
  const copyButton = makeButton(messages.copy, "(7)");
  const clearButton = makeButton(messages.clear, "(8)");

  addButton.addEventListener("click", actions.onAdd);
  spaceButton.addEventListener("click", actions.onSpace);
  undoButton.addEventListener("click", actions.onUndo);
  copyButton.addEventListener("click", actions.onCopy);
  clearButton.addEventListener("click", actions.onClear);

  buttons.append(addButton, spaceButton, undoButton, copyButton, clearButton);
  return buttons;
};
