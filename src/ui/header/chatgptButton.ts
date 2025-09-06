import { messages } from "../../i18n";
import { openChatgpt } from "../../core/chatgpt";

export const createChatgptButton = (): HTMLElement => {
  // ChatGPT ボタン
  const chatgptBtn = document.createElement("button");
  chatgptBtn.type = "button";
  chatgptBtn.title = `${messages.chatgptPromptButtonTitle} (8)`;
  chatgptBtn.style.cssText = `
    width: 24px;
    height: 24px;
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
    transition: transform 0.3s ease;
  `;
  chatgptBtn.addEventListener("mouseenter", () => {
    chatgptBtn.style.transform = "scale(1.2)";
  });
  chatgptBtn.addEventListener("mouseleave", () => {
    chatgptBtn.style.transform = "scale(1)";
  });
  chatgptBtn.addEventListener("click", () => {
    openChatgpt();
  });

  // ChatGPT アイコン
  const chatgptIcon = document.createElement("img");
  chatgptIcon.alt = "ChatGPT";
  chatgptIcon.src =
    "https://cdn.oaistatic.com/assets/favicon-180x180-od45eci6.webp";
  chatgptIcon.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  `;

  chatgptBtn.appendChild(chatgptIcon);

  return chatgptBtn;
};
