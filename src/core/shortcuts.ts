import { Panel } from "../ui/panel";
import { TimestampActions } from "./actions";
import { ResetManager } from "./reset";
import { Storage } from "../storage";
import { geniusSearch } from "./genius";
import { openChatgpt } from "./chatgpt";

// キーバインド定義
const KEY_BINDINGS: Record<string, string> = {
  "1": "add",
  "2": "space",
  "3": "undo",
  "4": "geniusSearchBoth",
  "5": "openChatgpt",
  "6": "openLrcLib",
  "7": "copy",
  "8": "clear",
  "9": "toggleAutoReset",
  "0": "panelToggle",
  w: "seekRewind5s",
  e: "seekForward5s",
};

const SEEK_INTERVAL = 5;

export class ShortcutManager {
  private panel: Panel;
  private actions: TimestampActions;
  private resetManager: ResetManager;

  constructor(
    panel: Panel,
    actions: TimestampActions,
    resetManager: ResetManager
  ) {
    this.panel = panel;
    this.actions = actions;
    this.resetManager = resetManager;
    this.setupShortcuts();
  }

  private setupShortcuts(): void {
    // キーボードショートカット
    document.addEventListener("keydown", (e) => {
      // 入力フィールドでは無効化
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.contentEditable === "true")
      ) {
        return;
      }

      // 修飾キー使用時は無効化
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const action = KEY_BINDINGS[e.key];
      if (!action) return;

      e.preventDefault();

      switch (action) {
        case "add":
          this.actions.add();
          break;
        case "space":
          this.actions.addSpace();
          break;
        case "undo":
          this.actions.undo();
          break;
        case "copy":
          this.actions.copy();
          break;
        case "clear":
          this.actions.clear();
          break;
        case "toggleAutoReset":
          this.toggleAutoReset();
          break;
        case "geniusSearchBoth":
          geniusSearch("both");
          break;
        case "openChatgpt":
          openChatgpt();
          break;
        case "openLrcLib": {
          const linkSelector =
            'div.blyrics-footer__container > a[href^="https://lrclibup.boidu.dev/"]';
          const buttonSelector = "button.blyrics-add-lyrics-button";

          const openLink =
            document.querySelector<HTMLAnchorElement>(linkSelector);

          if (openLink) {
            window.open(openLink.href, "_blank", "noopener,noreferrer");
          } else {
            const openButton =
              document.querySelector<HTMLButtonElement>(buttonSelector);
            if (openButton) {
              openButton.click();
            }
          }
          break;
        }
        case "panelToggle":
          this.panel.toggleVisibility();
          break;
        case "seekRewind5s":
          this.seek(-SEEK_INTERVAL);
          break;
        case "seekForward5s":
          this.seek(SEEK_INTERVAL);
          break;
      }
    });
  }

  private seek(seconds: number): void {
    const video = document.querySelector("video");
    if (video) {
      video.currentTime = Math.max(0, video.currentTime + seconds);
    }
  }

  private toggleAutoReset(): void {
    const current = Storage.getAutoResetEnabled();
    const next = !current;
    Storage.setAutoResetEnabled(next);

    if (!next) {
      // OFFにしたら進行中のリセットはキャンセル
      this.resetManager.cancelReset();
    }

    // フッターのUIを更新
    const update = (this.panel as any).footer?._updateIndicator as (
      enabled: boolean
    ) => void;
    update?.(next);
  }

  // Tampermonkey メニューコマンド
  setupMenuCommand(): void {
    GM_registerMenuCommand("Toggle Timestamp Panel", () => {
      this.panel.toggleVisibility();
    });
  }
}
