import { Panel } from "../ui/panel";
import { TimestampActions } from "./actions";
import { ResetManager } from "./reset";
import { Storage } from "../storage";
import { geniusSearch } from "./genius";
import { openChatgpt } from "./chatgpt";

// キーバインド定義
const KEY_BINDINGS: Record<string, string> = {
  "1": "add",
  "2": "undo",
  "3": "space",
  "4": "copy",
  "5": "clear",
  "6": "toggleAutoReset",
  "7": "geniusSearchBoth",
  "8": "openChatgpt",
  "9": "openLrcLib",
  "0": "panelToggle",
};

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
        case "undo":
          this.actions.undo();
          break;
        case "space":
          this.actions.addSpace();
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
          const link = document.querySelector<HTMLAnchorElement>(
            'div.blyrics-footer__container > a[href^="https://lrclibup.boidu.dev/"]'
          );
          if (link?.href) {
            window.open(link.href, "_blank", "noopener,noreferrer");
          }
          break;
        }
        case "panelToggle":
          this.panel.toggleVisibility();
          break;
      }
    });
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
