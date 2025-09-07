import { createNoticeWrapper } from "./footer/notice";
import { createGeniusButton } from "./footer/geniusButton";
import { createChatgptButton } from "./footer/chatgptButton";
import { createIndicatorButton } from "./footer/indicatorButton";

type FooterElement = HTMLElement & {
  _notice: ReturnType<typeof createNoticeWrapper>;
  _indicator: HTMLElement;
  _updateIndicator: (enabled: boolean) => void;
};

export const createFooter = (
  onToggleAutoReset?: (enabled: boolean) => void
): FooterElement => {
  const footer = document.createElement("div");
  // Footerラップ
  footer.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    height: 36px;
    padding: 6px-top;
    margin-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
  `;

  // Mediaラップ
  const mediaButtonWrapper = document.createElement("div");
  mediaButtonWrapper.style.cssText = `
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  `;

  const chatgpt = createChatgptButton();
  const notice = createNoticeWrapper();
  const genius = createGeniusButton();
  const indicator = createIndicatorButton(onToggleAutoReset);

  mediaButtonWrapper.append(chatgpt, genius.geniusButton);
  footer.append(
    notice,

    mediaButtonWrapper,
    indicator,
    genius.geniusMenu
  );

  return Object.assign(footer, {
    _notice: notice,
    _indicator: indicator._circle,
    _updateIndicator: indicator._update,
  });
};
