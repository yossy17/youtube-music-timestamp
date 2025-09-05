import { messages } from "./../i18n";
import { Storage } from "../storage";
import { geniusSearch } from "../core/genius";

export const createFooter = (
  onToggleAutoReset?: (enabled: boolean) => void
): HTMLElement => {
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

  // Noticeラップ
  const noticeWrapper = document.createElement("div");
  noticeWrapper.style.cssText = `
    margin-inline: 8px;
    flex: 1;
    text-align: center;
    min-height: 1em;
  `;

  // Geniusボタン
  const geniusButton = document.createElement("button");
  geniusButton.type = "button";
  geniusButton.title = messages.geniusSearchButtonTitle;
  geniusButton.setAttribute("aria-haspopup", "menu");
  geniusButton.setAttribute("aria-expanded", "false");
  geniusButton.style.cssText = `
    width: 24px; 
    height: 24px; 
    border-radius: 12px; 
    position: relative; 
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    border: none; 
    padding: 0; 
    background: transparent; 
    cursor: pointer; 
    transition: 0.3s ease;
  `;
  geniusButton.addEventListener("mouseenter", () => {
    geniusButton.style.transform = "scale(1.2)";
  });
  geniusButton.addEventListener("mouseleave", () => {
    geniusButton.style.transform = "scale(1)";
  });

  // Geniusアイコン
  const geniusIcon = document.createElement("img");
  geniusIcon.alt = "Genius";
  geniusIcon.src =
    "https://assets.genius.com/images/apple-touch-icon.png?1757013544";
  geniusIcon.style.cssText = `
    width: 100%; 
    height: 100%;
    border-radius: 6px;
    object-fit: contain;
    user-drag: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
  `;
  geniusIcon.addEventListener("mouseenter", () => {
    geniusIcon.style.transform = "scale(1.05)";
  });

  geniusIcon.addEventListener("mouseleave", () => {
    geniusIcon.style.transform = "scale(1)";
  });

  const geniusMenu = document.createElement("div");
  geniusMenu.setAttribute("role", "menu");
  geniusMenu.style.cssText = ` position: absolute;
    display: none;
    flex-direction: column;
    gap: 8px;
    bottom: 40px;
    left: -50px;
    z-index: 100;
    padding: 8px;
    background: rgba(10, 10, 15, 0.85);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow:
      rgba(0, 0, 0, 0.8) 0px 20px 40px,
      rgba(255, 255, 255, 0.05) 0px 1px 0px inset;
    backdrop-filter: blur(10px) saturate(180%);
  `;

  const createGeniusMenuItem = (
    label: string,
    mode: "both" | "title" | "artist",
    emoji: string
  ) => {
    const geniusMenuItem = document.createElement("button");
    geniusMenuItem.type = "button";
    geniusMenuItem.title = label;
    geniusMenuItem.textContent = emoji;
    geniusMenuItem.setAttribute("role", "menuitem");
    geniusMenuItem.style.cssText = ` width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(40, 40, 40, 0.8);
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      `;
    geniusMenuItem.addEventListener("mouseenter", () => {
      geniusMenuItem.style.background = "rgba(255, 255, 255, 0.1)";
      geniusMenuItem.style.borderColor = "rgba(255, 255, 255, 0.2)";
      geniusMenuItem.style.transform = "scale(1.05)";
    });
    geniusMenuItem.addEventListener("mouseleave", () => {
      geniusMenuItem.style.background = "rgba(40, 40, 40, 0.8)";
      geniusMenuItem.style.borderColor = "transparent";
      geniusMenuItem.style.transform = "scale(1)";
    });
    geniusMenuItem.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      geniusSearch(mode);
    });
    return geniusMenuItem;
  };

  geniusMenu.appendChild(
    createGeniusMenuItem(`${messages.geniusSearchBoth} (7)`, "both", "🎶")
  );
  geniusMenu.appendChild(
    createGeniusMenuItem(`${messages.geniusSearchTitle} (8)`, "title", "🎵")
  );
  geniusMenu.appendChild(
    createGeniusMenuItem(`${messages.geniusSearchArtist} (9)`, "artist", "👤")
  );
  footer.appendChild(geniusMenu);

  const openMenu = () => {
    geniusMenu.style.display = "flex";
    geniusButton.setAttribute("aria-expanded", "true");
    setTimeout(() => {
      document.addEventListener("click", onDocClick, { capture: !0 });
    }, 0);
  };

  const closeMenu = () => {
    geniusMenu.style.display = "none";
    geniusButton.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", onDocClick, { capture: !0 } as any);
  };

  const onDocClick = (e: MouseEvent) => {
    const t = e.target as Node;

    // メニューやボタンをクリックしたら閉じない
    if (geniusMenu.contains(t) || geniusButton.contains(t)) return;

    // パネル内をクリックしたら閉じない
    const ytmTsPanel = document.querySelector("#ytm-ts");
    if (ytmTsPanel && ytmTsPanel.contains(t)) return;

    // それ以外なら閉じる
    closeMenu();
  };

  geniusButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (geniusMenu.style.display === "flex") closeMenu();
    else openMenu();
  });

  const indicatorTrack = document.createElement("div");
  indicatorTrack.title = `${messages.toggleAutoResetButtonTitle} (6)`;
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
  indicatorTrack.addEventListener("mouseenter", () => {
    indicatorTrack.style.transform = "scale(1.2)";
  });

  indicatorTrack.addEventListener("mouseleave", () => {
    indicatorTrack.style.transform = "scale(1)";
  });

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

  geniusButton.appendChild(geniusIcon);
  indicatorCircle.appendChild(indicatorDot);
  indicatorTrack.appendChild(indicatorCircle);
  footer.append(geniusButton, noticeWrapper, indicatorTrack);

  // 外部アクセス用
  (footer as any)._noticeWrapper = noticeWrapper;
  (footer as any)._indicator = indicatorCircle;
  (footer as any)._updateIndicator = updateIndicator;

  return footer;
};
