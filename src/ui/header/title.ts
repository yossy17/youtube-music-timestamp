export const createTitle = (): HTMLElement => {
  // タイトルラッパー
  const ytmTimestampWrapper = document.createElement("div");
  ytmTimestampWrapper.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: grab;
  `;

  // タイトルアイコン
  const ytmTimestampIcon = document.createElement("img");
  ytmTimestampIcon.src =
    "https://yossy17.github.io/youtube-music-timestamp/images/icons/normal/icon-48.webp";
  ytmTimestampIcon.style.cssText = `
    width: 24px;
    height: 24px;
    object-fit: contain;
    user-drag: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
  `;

  // タイトルテキスト
  const ytmTimestampTitle = document.createElement("div");
  ytmTimestampTitle.textContent = "Timestamp";
  ytmTimestampTitle.style.cssText = `
    font-family: "Alternate Gothic W01 No 2", sans-serif !important;    
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 0.5px;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255 0 51) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `;

  ytmTimestampWrapper.appendChild(ytmTimestampIcon);
  ytmTimestampWrapper.appendChild(ytmTimestampTitle);

  return ytmTimestampWrapper;
};
