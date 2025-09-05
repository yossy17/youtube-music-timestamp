import { Panel } from "../ui/panel";
import { TimestampActions } from "./actions";

// キーバインド定義
const KEY_BINDINGS: Record<string, string> = {
  "1": "add",
  "2": "undo",
  "3": "space",
  "4": "copy",
  "5": "clear",
};

export class ShortcutManager {
  private panel: Panel;
  private actions: TimestampActions;

  constructor(panel: Panel, actions: TimestampActions) {
    this.panel = panel;
    this.actions = actions;
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
      }
    });

    // Alt+z でパネル表示切り替え
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        this.panel.toggleVisibility();
      }
    });
  }

  // Tampermonkey メニューコマンド
  setupMenuCommand(): void {
    GM_registerMenuCommand("Toggle Timestamp Panel", () => {
      this.panel.toggleVisibility();
    });
  }
}
