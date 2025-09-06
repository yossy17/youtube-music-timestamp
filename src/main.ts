import { Panel } from "./ui/panel";
import { TimestampActions } from "./core/actions";
import { ResetManager } from "./core/reset";
import { ShortcutManager } from "./core/shortcuts";
import { openPanel } from "./core/openPanel";
import { createOpenPanelButton } from "./ui/openPanelButton";
// import "./addon";

(() => {
  "use strict";

  GM_addStyle(`
    @import url("https://db.onlinewebfonts.com/c/494eee3143d83527124d62f383506d6e?family=Alternate+Gothic+W01+No+2");
  `);

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

    // パネル開閉ボタン
    const panelController = new openPanel(panel);
    createOpenPanelButton(panelController);

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
