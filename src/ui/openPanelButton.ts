import { openPanel } from "../core/openPanel";

export function createOpenPanelButton(controller: openPanel): HTMLElement {
  const openYtmTsPanelContainer = document.createElement("div");
  openYtmTsPanelContainer.style.cssText = `
    display: inline-block;
  `;

  const openYtmTsPanelWrapper = document.createElement("div");
  openYtmTsPanelWrapper.id = "openYtmTsPanelWrapper";

  const openYtmTsPanel = document.createElement("button");
  openYtmTsPanel.className =
    "yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button yt-spec-button-shape-next--enable-backdrop-filter-experiment";
  openYtmTsPanel.type = "button";
  openYtmTsPanel.title = "Open Youtube Music Timestamp Panel";

  const openYtmTsPanelIcon = document.createElement("img");
  openYtmTsPanelIcon.alt = "Open Youtube Music Timestamp Panel";
  openYtmTsPanelIcon.src =
    "https://yossy17.github.io/youtube-music-timestamp/images/icons/vector/icon-vector-48.png";
  openYtmTsPanelIcon.style.cssText = `
    width: 65%%;
    height: 65%;
    user-drag: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
  `;

  openYtmTsPanelContainer.appendChild(openYtmTsPanelWrapper);
  openYtmTsPanelWrapper.appendChild(openYtmTsPanel);
  openYtmTsPanel.appendChild(openYtmTsPanelIcon);

  openYtmTsPanel.addEventListener("click", () => controller.togglePanel());

  // 🎯 middle-controls-buttons の最後に追加
  const controls = document.querySelector<HTMLDivElement>(
    "div.middle-controls-buttons.ytmusic-player-bar"
  );

  if (controls) {
    controls.appendChild(openYtmTsPanelContainer);
  } else {
    console.warn("⚠️ middle-controls-buttons が見つかりませんでした");
  }

  return openYtmTsPanel;
}
