(() => {
  "use strict";

  // 自動リセット状態を保存するキー
  const GM_AUTORESET_KEY = "ytm_autoreset_enabled";
  // タイムスタンプパネルの表示状態を保存するキー
  const GM_PANEL_VISIBLE_KEY = "ytm_ts_visible";

  // GM/TM ストレージから真偽値を取得（デフォルト値あり）
  function gmGetBool(key: string, def: boolean): boolean {
    try {
      const v = (GM_getValue as any)?.(key);
      return typeof v === "boolean" ? v : def;
    } catch {
      return def;
    }
  }

  // GM/TM ストレージに真偽値を保存
  function gmSetBool(key: string, val: boolean) {
    try {
      (GM_setValue as any)?.(key, val);
    } catch {}
  }

  // トースト通知（右上に一時的にメッセージを表示）
  function toast(msg: string) {
    const node = document.createElement("div");
    node.textContent = msg;
    Object.assign(node.style, {
      position: "fixed",
      top: "12px",
      right: "12px",
      padding: "8px 12px",
      background: "rgba(0,0,0,0.8)",
      color: "#fff",
      borderRadius: "12px",
      fontSize: "12px",
      zIndex: "2147483647",
      pointerEvents: "none",
      transition: "opacity .3s ease",
      opacity: "1",
    } as CSSStyleDeclaration);
    document.body.appendChild(node);
    setTimeout(() => (node.style.opacity = "0"), 1400);
    setTimeout(() => node.remove(), 1800);
  }

  // 6キー：自動リセット機能のON/OFF切り替え
  function toggleAutoReset() {
    const next = !gmGetBool(GM_AUTORESET_KEY, true);
    gmSetBool(GM_AUTORESET_KEY, next);
    toast(`Auto-Reset: ${next ? "ON" : "OFF"}`);

    // 他の処理（ResetManager など）に通知するためのカスタムイベントを発火
    document.dispatchEvent(
      new CustomEvent("ytm:autoReset:toggled", { detail: { enabled: next } })
    );
  }

  // 7キー：現在の曲を Genius で検索
  function geniusSearch() {
    const titleEl = document.querySelector<HTMLElement>(
      ".title.ytmusic-player-bar"
    );
    const artistEl = document.querySelector<HTMLElement>(
      "yt-formatted-string.byline.ytmusic-player-bar > a[href^='channel/']"
    );
    const title = titleEl?.textContent?.trim() ?? "";
    const artist = artistEl?.textContent?.trim() ?? "";

    if (!title && !artist) {
      toast("曲情報が見つかりませんでした");
      return;
    }

    const q = encodeURIComponent(`${title} ${artist}`.trim());
    const url = `https://genius.com/search?q=${q}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // 入力欄などでのショートカット誤作動を防止
  function shouldIgnore(e: KeyboardEvent): boolean {
    const t = e.target as HTMLElement | null;
    if (!t) return false;
    const tag = t.tagName.toLowerCase();
    return tag === "input" || tag === "textarea" || t.isContentEditable;
  }

  // キーボードショートカットの設定
  document.addEventListener(
    "keydown",
    (e) => {
      if (shouldIgnore(e)) return;
      if (e.key === "6") {
        e.preventDefault();
        toggleAutoReset();
      } else if (e.key === "7") {
        e.preventDefault();
        geniusSearch();
      }
    },
    { passive: true }
  );

  // パネルに閉じる（×）ボタンを追加
  function addCloseButtonIfMissing() {
    // パネル候補をいくつかのセレクタで探す
    const panel =
      document.querySelector<HTMLElement>(
        "#timestamp-panel, .timestamp-panel, [data-panel='timestamp']"
      ) ||
      // 見つからない場合はテキストに "Timestamp" を含む固定パネルを探す
      Array.from(document.querySelectorAll<HTMLElement>("div")).find(
        (el) =>
          el.textContent?.includes("Timestamp") &&
          getComputedStyle(el).position === "fixed"
      );

    if (!panel) return;
    if (panel.querySelector(".ytm-ts-close")) return;

    // × ボタンを作成
    const btn = document.createElement("button");
    btn.className = "ytm-ts-close";
    btn.textContent = "×";
    Object.assign(btn.style, {
      position: "absolute",
      top: "4px",
      right: "6px",
      width: "24px",
      height: "24px",
      lineHeight: "24px",
      textAlign: "center",
      borderRadius: "9999px",
      border: "none",
      background: "rgba(0,0,0,.6)",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
    } as CSSStyleDeclaration);

    // パネルが position:static の場合は relative に変更
    const style = getComputedStyle(panel);
    if (style.position === "static") {
      (panel.style as any).position = "relative";
    }

    // ボタンを押すとパネルを非表示にし、状態を保存
    btn.addEventListener("click", () => {
      gmSetBool(GM_PANEL_VISIBLE_KEY, false);
      panel.style.display = "none";
      toast("パネルを非表示にしました");
    });

    panel.appendChild(btn);
  }

  // DOM変化を監視し、パネルが出現したら自動で×ボタンを追加
  const mo = new MutationObserver(() => addCloseButtonIfMissing());
  mo.observe(document.documentElement, { childList: true, subtree: true });
  addCloseButtonIfMissing();
})();
