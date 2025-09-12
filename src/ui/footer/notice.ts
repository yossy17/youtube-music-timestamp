export const createNoticeWrapper = () => {
  // Noticeラップ
  const noticeWrapper = document.createElement("div");
  noticeWrapper.style.cssText = `
    margin-left: 8px;
    flex: 1;
    text-align: left;
    min-height: 1em;
    text-align: center;
  `;

  // Noticeメッセージ
  const noticeMessage = document.createElement("div");
  noticeMessage.style.cssText = `
    font-size: 12px;
    font-style: italic;
    color: rgba(255, 136, 136, 0.8);
    font-weight: bold;
    min-height: 1em;
    text-shadow: 0px 0px 8px rgba(255, 136, 136, 0.3);
  `;

  noticeWrapper.appendChild(noticeMessage);

  // デフォルトメッセージを保存
  let defaultMessage = "";
  let temporaryTimer: number | null = null;

  const setMessage = (msg: string) => {
    noticeMessage.textContent = msg || "";
  };

  const clear = () => {
    noticeMessage.textContent = defaultMessage;
  };

  // デフォルトメッセージを設定
  const setDefault = (msg: string) => {
    defaultMessage = msg;
    // 他の一時的なメッセージが表示されていない場合はすぐに反映
    if (!temporaryTimer) {
      noticeMessage.textContent = defaultMessage;
    }
  };

  // 一時的なメッセージを表示
  const setTemporary = (msg: string, duration = 3000) => {
    // 既存のタイマーをクリア
    if (temporaryTimer) {
      clearTimeout(temporaryTimer);
    }

    // 一時的なメッセージを表示
    noticeMessage.textContent = msg;

    // 指定時間後にデフォルトメッセージに戻す
    temporaryTimer = window.setTimeout(() => {
      noticeMessage.textContent = defaultMessage;
      temporaryTimer = null;
    }, duration);
  };

  // デフォルトメッセージに即座に戻す
  const restoreDefault = () => {
    if (temporaryTimer) {
      clearTimeout(temporaryTimer);
      temporaryTimer = null;
    }
    noticeMessage.textContent = defaultMessage;
  };

  return Object.assign(noticeWrapper, {
    setMessage,
    clear,
    setDefault,
    setTemporary,
    restoreDefault,
  });
};
