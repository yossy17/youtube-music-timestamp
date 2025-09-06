export const createTitle = (): HTMLElement => {
  // タイトルラッパー
  const ytmTimestampWrapper = document.createElement("div");
  ytmTimestampWrapper.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `;

  // タイトルアイコン
  const ytmTimestampIcon = document.createElement("img");
  ytmTimestampIcon.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUVBMVEVHcEz/ADP/ADP/ADP/ADP/ADP/ADP/ADP/ADP/ADP/ADL/////KlX/DD3/GUf/wc3/tcT/eJP/WHn/ydT/P2X/7fH/nrH/prj/3eP/g5z/orU7aniKAAAACnRSTlMArhtu7wLENt2SyxIIrQAAATxJREFUeNqFU1mWgyAQxC0qdLOjkPsfdFiiSDI+6wOfdFG9kxPTPHTLSOm4dMM8ndfVvC70xLJ+U/p1pA3Gtb/a5xf9wWu+2Bf6D5b5144cgOM3oz/0QUkRIRUcXvoc//p5rcymgXPQm1EflXVKDkr8fJc2sgCizcqdl1zmUwD3d7oLzoXEfu/4kTgiVJJnN85FeaRcqiPOocRnbDy1cIw5sW1IrSmRDqQrAluyO1aQ9Lci0ZHsAaWOKp5JkwkeIlti9kHGnIKIV4E5C4URIl3wnAeJR/lDwZgB2BNBYH6TcCGYZOHcx4+phOoCRXorlU8nVhc1yMBOhBrkJU3wh91DTbMWqtbBaVoL1ZTaylTJ1LRa6rZZaLW22DSrbXdG2+7ngXkeueehJdPT2JPpZnGmh9Vrcbe81c3N+v8BqrEmmUM9lVUAAAAASUVORK5CYII=";
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
