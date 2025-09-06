import { messages } from "../../i18n";
import { geniusSearch } from "../../core/genius";

export const createGeniusButton = () => {
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
    geniusMenuItem.textContent = emoji;
    geniusMenuItem.title = label;
    geniusMenuItem.setAttribute("role", "menuitem");
    geniusMenuItem.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(40, 40, 40, 0.8);
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
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
  // footer.appendChild(geniusMenu);

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

  geniusButton.appendChild(geniusIcon);

  return { geniusButton, geniusMenu };
};
