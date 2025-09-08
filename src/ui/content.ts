import { createActionButtons, ButtonActions } from "./content/actionButtons";
import { createListBox, updateListBox } from "./content/listBox";

export type { ButtonActions };

export const createContent = (actions: ButtonActions) => {
  const content = document.createElement("div");
  content.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  const buttons = createActionButtons(actions);
  const listBox = createListBox();

  content.append(buttons, listBox);

  return {
    element: content,
    listBox,
    updateListBox,
  };
};
