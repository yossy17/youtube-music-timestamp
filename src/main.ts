import { Panel } from "./ui/panel";
import { TimestampActions } from "./core/actions";
import { ResetManager } from "./core/reset";
import { ShortcutManager } from "./core/shortcuts";
// import "./addon";

(() => {
  "use strict";

  let panel: Panel;
  let actions: TimestampActions;
  let resetManager: ResetManager;

  const createActionHandlers = () => ({
    onAdd: () => actions.add(),
    onUndo: () => actions.undo(),
    onSpace: () => actions.addSpace(),
    onCopy: () => actions.copy(),
    onClear: () => actions.clear(),
  });

  try {
    // 開発モード限定デバッグログ
    if (import.meta.env.MODE === "development") {
      console.log("🚀 Main UserScript Starting (Development Mode)");
      console.log("📍 Current URL:", window.location.href);
    }

    panel = new Panel(createActionHandlers());
    actions = new TimestampActions(panel);
    resetManager = new ResetManager(actions);

    const shortcuts = new ShortcutManager(panel, actions, resetManager);
    shortcuts.setupMenuCommand();

    if (import.meta.env.MODE === "development") {
      console.log("✅ UserScript initialization complete!");
    }
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("❌ UserScript initialization failed:", error);
      console.error("🐞 Error details:", error);
    }
  }
})();
