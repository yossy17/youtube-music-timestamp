import { Storage } from "../storage";

export const createFooter = (
  onToggleAutoReset?: (enabled: boolean) => void
): HTMLElement => {
  const footer = document.createElement("div");
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

  const noticeWrapper = document.createElement("div");
  noticeWrapper.style.cssText = `
    margin-inline: 8px;
    flex: 1;
    text-align: center;
    min-height: 1em;
  `;

  const indicatorTrack = document.createElement("div");
  indicatorTrack.style.cssText = `
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  transform: scale(1);
`;

  const indicatorCircle = document.createElement("div");
  indicatorCircle.style.cssText = `
  position: absolute;
  top: 3px;
  width: 18px;
  height: 18px;
  background: rgb(255, 255, 255);
  border-radius: 9px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 4.5px -1px;
  transition: 0.3s ease-in-out;
  z-index: 10;
  transform: translateX(24px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

  const indicatorDot = document.createElement("span");
  indicatorDot.style.cssText = `
  width: 6px;
  height: 6px;
  border-radius: 3px;
  transition: background-color 0.3s;
`;

  const updateIndicator = (enabled: boolean) => {
    indicatorTrack.style.background = enabled
      ? "rgb(255, 0, 51)"
      : "rgb(55, 65, 81)";

    indicatorTrack.style.boxShadow = enabled
      ? "rgba(16, 185, 129, 0.3) 0px 7.5px 11.25px -2.25px"
      : "rgba(55, 65, 81, 0.2) 0px 7.5px 11.25px -2.25px";

    indicatorCircle.style.transform = enabled
      ? "translateX(24px)"
      : "translateX(3px)";

    indicatorDot.style.background = enabled
      ? "rgb(255, 0, 51)"
      : "rgb(55, 65, 81)";
  };

  // 初期状態を設定
  let enabled = Storage.getAutoResetEnabled();
  updateIndicator(enabled);

  // クリックイベント
  indicatorTrack.addEventListener("click", () => {
    enabled = !enabled;
    Storage.setAutoResetEnabled(enabled);
    updateIndicator(enabled); // 色更新はここで完結
    onToggleAutoReset?.(enabled); // 外部への通知のみ
  });

  indicatorCircle.appendChild(indicatorDot);
  indicatorTrack.appendChild(indicatorCircle);
  footer.append(noticeWrapper, indicatorTrack);

  // 外部アクセス用
  (footer as any)._noticeWrapper = noticeWrapper;
  (footer as any)._indicator = indicatorCircle;
  (footer as any)._updateIndicator = updateIndicator;

  return footer;
};
