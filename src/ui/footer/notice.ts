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

  const setMessage = (msg: string) => {
    noticeMessage.textContent = msg || "";
  };

  const clear = () => {
    noticeMessage.textContent = "";
  };

  return Object.assign(noticeWrapper, {
    setMessage,
    clear,
  });
};
