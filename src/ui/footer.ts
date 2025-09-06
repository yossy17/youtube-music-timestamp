import { createNoticeWrapper } from "./footer/notice";
import { createGeniusButton } from "./footer/genius";
import { createIndicatorButton } from "./footer/indicator";

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
    height: 36px;
    padding: 6px 10px 0;
    margin-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
  `;

  const notice = createNoticeWrapper();
  const genius = createGeniusButton();
  const indicator = createIndicatorButton(onToggleAutoReset);

  footer.append(genius.geniusButton, notice, indicator, genius.geniusMenu);

  return Object.assign(footer, {
    _notice: notice,
    _indicator: indicator._circle,
    _updateIndicator: indicator._update,
  });
};
