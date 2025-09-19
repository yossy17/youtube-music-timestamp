// ==UserScript==
// @name YouTube Music Timestamp
// @name:ja YouTube Music タイムスタンプ
// @name:zh-CN YouTube Music 时间戳
// @name:ko Youtube Music 타임스탬프
// @description Easily add timestamps in YouTube Music and automatically create '.LRC' files
// @description:ja Youtube Musicで.LRCファイルを簡単に作ることができます
// @description:zh-CN 您可以在 YouTube Music 中轻松添加时间戳，并自动生成“.LRC”文件
// @description:ko YouTube Music에서 손쉽게 타임스탬프를 추가하고 '.LRC' 파일을 자동으로 생성할 수 있습니다
// @version 0.3.5
 // @author Yos_sy
 // @match *://music.youtube.com/*
// @namespace http://tampermonkey.net/
 // @icon https://github.com/yossy17/youtube-music-timestamp/raw/master/images/icons/normal/icon-48.webp
 // @grant GM_setClipboard
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @license GPL
 // @updateURL https://github.com/yossy17/youtube-music-timestamp/raw/master/dist/userscript.user.js
 // @downloadURL https://github.com/yossy17/youtube-music-timestamp/raw/master/dist/userscript.user.js
 // @supportURL https://github.com/yossy17/youtube-music-timestamp
 // ==/UserScript==

(function() {
  "use strict";
  const GM_POSITION_KEY = "ytm_ts_position";
  const GM_VISIBLE_KEY = "ytm_ts_visible";
  const SS_TIMESTAMPS_KEY = "ytm_ts_timestamps";
  const GM_AUTORESET_KEY = "ytm_ts_autoreset";
  class Storage {
    // SSからタイムスタンプデータ読み込み
    static loadTimestamps() {
      const added = sessionStorage.getItem(SS_TIMESTAMPS_KEY);
      return added ? JSON.parse(added) : [];
    }
    // SSにデータ保存
    static saveTimestamps(timestamps) {
      sessionStorage.setItem(SS_TIMESTAMPS_KEY, JSON.stringify(timestamps));
    }
    // パネル位置の保存・読み込み
    static getPosition() {
      const stored = GM_getValue(GM_POSITION_KEY, "{}");
      const position = JSON.parse(stored);
      if (Number.isFinite(position.top) && Number.isFinite(position.left)) {
        return position;
      }
      return null;
    }
    static savePosition(position) {
      GM_setValue(GM_POSITION_KEY, JSON.stringify(position));
    }
    // パネル表示状態の保存・読み込み
    static getVisibility() {
      return GM_getValue(GM_VISIBLE_KEY, false);
    }
    static saveVisibility(visible) {
      GM_setValue(GM_VISIBLE_KEY, visible);
    }
    // AutoReset設定の保存・読み込み
    static getAutoResetEnabled() {
      return GM_getValue(GM_AUTORESET_KEY, false);
    }
    static setAutoResetEnabled(enabled) {
      GM_setValue(GM_AUTORESET_KEY, enabled);
    }
  }
  const createTitle = () => {
    const ytmTimestampWrapper = document.createElement("div");
    ytmTimestampWrapper.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: grab;
  `;
    const ytmTimestampIcon = document.createElement("img");
    ytmTimestampIcon.src = "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/icons/normal/icon-48.webp";
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
  const mediaButtons = [
    {
      url: "https://github.com/yossy17/youtube-music-timestamp",
      title: "GitHub",
      imgSrc: "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/assets/github.webp"
    },
    {
      url: "https://x.com/yos_sy17",
      title: "Twitter",
      imgSrc: "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/assets/twitter.webp"
    }
  ];
  const createMediaButton = () => {
    const mediaButtonWrapper = document.createElement("div");
    mediaButtonWrapper.style.cssText = `
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
  `;
    mediaButtons.forEach(({ url, title, imgSrc, style }) => {
      const mediaButtonLink = document.createElement("a");
      mediaButtonLink.href = url;
      mediaButtonLink.title = title;
      mediaButtonLink.target = "_blank";
      mediaButtonLink.rel = "noopener noreferrer";
      mediaButtonLink.style.cssText = `
    width: 24px;
    height: 24px;
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
    transition: transform 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `;
      if (style) {
        Object.assign(mediaButtonLink.style, style);
      }
      const mediaButtonIcon = document.createElement("img");
      mediaButtonIcon.alt = title;
      mediaButtonIcon.src = imgSrc;
      mediaButtonIcon.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-drag: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
    opacity: 0.75;
    transition: opacity 0.2s ease;
  `;
      mediaButtonLink.addEventListener("mouseenter", () => {
        mediaButtonLink.style.transform = "scale(1.05)";
        mediaButtonIcon.style.opacity = "1";
      });
      mediaButtonLink.addEventListener("mouseleave", () => {
        mediaButtonLink.style.transform = "scale(1)";
        mediaButtonIcon.style.opacity = "0.75";
      });
      mediaButtonLink.appendChild(mediaButtonIcon);
      mediaButtonWrapper.appendChild(mediaButtonLink);
    });
    return mediaButtonWrapper;
  };
  const i18n = {
    ja: {
      add: "追加",
      space: "スペース",
      undo: "戻る",
      copy: "コピー",
      clear: "削除",
      noticeReset: "次の曲を検出 {}秒後にリセットします…",
      copied: "コピーしました",
      nothing: "タイムスタンプがありません",
      toggleAutoReset: "自動リセットは無効です",
      toggleAutoResetButtonTitle: "タイムスタンプの自動リセット",
      geniusSearchBoth: "曲名とアーティストで検索",
      geniusSearchTitle: "曲名で検索",
      geniusSearchArtist: "アーティストで検索",
      geniusSearchButtonTitle: "Genius 検索",
      chatgptPrompt: [
        "全ての時間に歌詞を対応させた完成版LRCファイルを出してください。",
        "時間と歌詞の間には半角スペースを入れてください。",
        "各行の最後はスペース要素がないようにしてください。",
        "[Verse 1]や[Chorus]や最初にタイトルなどの要素がある場合、その要素は無視してください。",
        "歌の構成(例: サビやAメロなど)で改行されている場所は、そのまま改行してコードブロックとして出力してください。",
        "LRCファイルを出した後、[Verse 1]や[Chorus]や最初にタイトルなどの要素を消したプレーンな歌詞を出してください。",
        "もし行数が合わないやどちらかが空の行があった場合教えてください。"
      ],
      chatgptPromptButtonTitle: "ChatGPT プロンプト",
      closeButtonTitle: "閉じる"
    },
    en: {
      add: "Add",
      space: "Space",
      undo: "Undo",
      copy: "Copy",
      clear: "Clear",
      noticeReset: "Next track detected… resetting in {}s",
      copied: "Copied!",
      nothing: "No timestamps yet",
      toggleAutoReset: "Auto reset is disabled",
      toggleAutoResetButtonTitle: "Timestamp Auto Reset",
      geniusSearchBoth: "Search by song title and artist",
      geniusSearchTitle: "Search by song title",
      geniusSearchArtist: "Search by song artist",
      geniusSearchButtonTitle: "Genius Search",
      chatgptPrompt: [
        "Please generate a completed LRC file with all timestamps aligned to the lyrics.",
        "Insert a half-width space between the time and the lyrics.",
        "Ensure there are no trailing spaces at the end of each line.",
        "Ignore elements such as [Verse 1], [Chorus], or any titles at the beginning.",
        "Preserve line breaks where the song structure (such as verses or choruses) is separated, and output them in a code block.",
        "After outputting the LRC file, also provide the plain lyrics with those elements removed.",
        "If the number of lines does not match or if there are any empty lines, please let me know."
      ],
      chatgptPromptButtonTitle: "ChatGPT Prompt",
      closeButtonTitle: "Close"
    },
    "zh-CN": {
      add: "添加",
      space: "空格",
      undo: "撤销",
      copy: "复制",
      clear: "删除",
      noticeReset: "检测到下一首 {}秒后重置…",
      copied: "已复制！",
      nothing: "没有时间戳",
      toggleAutoReset: "自动重置已禁用",
      toggleAutoResetButtonTitle: "时间戳自动重置",
      geniusSearchBoth: "按标题和歌手搜索",
      geniusSearchTitle: "按标题搜索",
      geniusSearchArtist: "按歌手搜索",
      geniusSearchButtonTitle: "Genius 搜索",
      chatgptPrompt: [
        "请生成一个完整的 LRC 文件，并使所有时间与歌词对应。",
        "在时间和歌词之间插入半角空格。",
        "确保每行末尾没有空格字符。",
        "忽略 [Verse 1]、[Chorus] 或开头的标题等元素。",
        "在歌曲结构(如主歌或副歌)换行的地方保持换行，并以代码块形式输出。",
        "在输出 LRC 文件后，请再输出删除这些元素的纯歌词。",
        "如果行数不匹配或有空行，请告诉我。"
      ],
      chatgptPromptButtonTitle: "ChatGPT 提示词",
      closeButtonTitle: "关闭"
    },
    ko: {
      add: "추가",
      space: "공백",
      undo: "뒤로",
      copy: "복사",
      clear: "삭제",
      noticeReset: "다음 곡 감지… {}초 후 초기화",
      copied: "복사했습니다!",
      nothing: "타임스탬프가 없습니다",
      toggleAutoReset: "자동 재설정이 비활성화되었습니다",
      toggleAutoResetButtonTitle: "타임스탬프 자동 재설정",
      geniusSearchBoth: "제목과 아티스트로 검색",
      geniusSearchTitle: "제목으로 검색",
      geniusSearchArtist: "아티스트로 검색",
      geniusSearchButtonTitle: "Genius 검색",
      chatgptPrompt: [
        "모든 시간에 가사를 맞춘 완성된 LRC 파일을 만들어 주세요.",
        "시간과 가사 사이에는 반각 공백을 넣어 주세요.",
        "각 줄 끝에는 공백 문자가 없도록 해 주세요.",
        "[Verse 1], [Chorus] 또는 제목과 같은 요소는 무시해 주세요.",
        "노래 구조(예: 절, 후렴)에서 줄바꿈된 곳은 그대로 줄바꿈하여 코드 블록으로 출력해 주세요.",
        "LRC 파일을 출력한 후, 이러한 요소를 제거한 일반 가사도 함께 출력해 주세요.",
        "줄 수가 맞지 않거나 빈 줄이 있으면 알려 주세요."
      ],
      chatgptPromptButtonTitle: "ChatGPT 프롬프트",
      closeButtonTitle: "닫다"
    }
  };
  function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith("ja")) return "ja";
    if (browserLang.startsWith("zh")) return "zh-CN";
    if (browserLang.startsWith("ko")) return "ko";
    return "en";
  }
  const currentLang = detectLanguage();
  const messages = i18n[currentLang];
  const createCloseButton = (onClose) => {
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.title = `${messages.closeButtonTitle} (0)`;
    closeBtn.textContent = "×";
    closeBtn.style.cssText = `
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s;
  `;
    closeBtn.addEventListener("mouseenter", () => {
      closeBtn.style.background = "rgba(255,255,255,0.2)";
    });
    closeBtn.addEventListener("mouseleave", () => {
      closeBtn.style.background = "rgba(255,255,255,0.08)";
    });
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    });
    return closeBtn;
  };
  const createHeader = (onDragStart, onClose) => {
    const header = document.createElement("div");
    header.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 8px;
    position: relative;
    padding-block: 12px;
  `;
    const title = createTitle();
    const media = createMediaButton();
    const close = createCloseButton(onClose);
    header.append(title, media, close);
    title.addEventListener("mousedown", onDragStart);
    return header;
  };
  const createActionButton = (text, shortcut) => {
    const actionButton = document.createElement("button");
    actionButton.textContent = `${text} ${shortcut}`;
    actionButton.style.cssText = `
    flex: 1 1 auto;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.06);
    color: rgb(240, 240, 245);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 11px;
    backdrop-filter: blur(10px);
    box-shadow:
      rgba(0, 0, 0, 0.3) 0px 4px 12px,
      rgba(255, 255, 255, 0.03) 0px 1px 0px inset;
  `;
    actionButton.addEventListener("mouseenter", () => {
      actionButton.style.background = "rgba(255, 255, 255, 0.12)";
      actionButton.style.borderColor = "rgba(255, 255, 255, 0.2)";
    });
    actionButton.addEventListener("mouseleave", () => {
      actionButton.style.background = "rgba(255, 255, 255, 0.06)";
      actionButton.style.borderColor = "transparent";
    });
    return actionButton;
  };
  const createActionButtons = (actions) => {
    const buttons = document.createElement("div");
    buttons.style.cssText = `
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  `;
    const addButton = createActionButton(messages.add, "(1)");
    const spaceButton = createActionButton(messages.space, "(2)");
    const undoButton = createActionButton(messages.undo, "(3)");
    const copyButton = createActionButton(messages.copy, "(7)");
    const clearButton = createActionButton(messages.clear, "(8)");
    addButton.addEventListener("click", actions.onAdd);
    spaceButton.addEventListener("click", actions.onSpace);
    undoButton.addEventListener("click", actions.onUndo);
    copyButton.addEventListener("click", actions.onCopy);
    clearButton.addEventListener("click", actions.onClear);
    buttons.append(addButton, spaceButton, undoButton, copyButton, clearButton);
    return buttons;
  };
  const createListBox = () => {
    const listBox = document.createElement("div");
    listBox.style.cssText = `
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 12px;
    height: 140px;
    overflow-y: auto;
    white-space: pre-wrap;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    line-height: 1.5;
    user-select: text;
    backdrop-filter: blur(8px);
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 4px 12px inset,
      rgba(255, 255, 255, 0.02) 0px 1px 0px;
    color: rgb(200, 200, 210);
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 0, 51, 0.4) transparent;
  `;
    return listBox;
  };
  const updateListBox = (listBox, timestamps) => {
    const content = timestamps.length ? timestamps.join("\n") : messages.nothing;
    listBox.textContent = content;
  };
  const countLines = (text) => {
    if (!text.trim()) return [];
    const blocks = text.split(/\n(?:\s*\n)+/).filter((block) => block.trim());
    return blocks.map((block) => {
      return block.split("\n").filter((line) => line.trim()).length;
    });
  };
  const formatNoticeDisplay = (lineCounts) => {
    const LINE_COUNTS = 10;
    if (lineCounts.length === 0) return "";
    if (lineCounts.length <= LINE_COUNTS) {
      return lineCounts.join(" ");
    }
    const visibleCounts = lineCounts.slice(-LINE_COUNTS);
    return "... " + visibleCounts.join(" ");
  };
  const updateListBoxNotice = (listBox, timestamps, noticeWrapper) => {
    const content = timestamps.length ? timestamps.join("\n") : messages.nothing;
    listBox.textContent = content;
    if (timestamps.length > 0) {
      const lineCounts = countLines(content);
      const display = formatNoticeDisplay(lineCounts);
      if (noticeWrapper.setDefault) {
        noticeWrapper.setDefault(display);
      } else {
        noticeWrapper.setMessage(display);
      }
    } else {
      if (noticeWrapper.setDefault) {
        noticeWrapper.setDefault("");
      } else {
        noticeWrapper.clear();
      }
    }
    listBox.scrollTop = listBox.scrollHeight;
  };
  const createContent = (actions) => {
    const content = document.createElement("div");
    content.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;
    const buttons = createActionButtons(actions);
    const listBox = createListBox();
    content.append(buttons, listBox);
    return {
      element: content,
      listBox,
      updateListBox
    };
  };
  const createNoticeWrapper = () => {
    const noticeWrapper = document.createElement("div");
    noticeWrapper.style.cssText = `
    margin-left: 8px;
    flex: 1;
    text-align: left;
    min-height: 1em;
    text-align: center;
  `;
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
    let defaultMessage = "";
    let temporaryTimer = null;
    const setMessage = (msg) => {
      noticeMessage.textContent = msg || "";
    };
    const clear = () => {
      noticeMessage.textContent = defaultMessage;
    };
    const setDefault = (msg) => {
      defaultMessage = msg;
      if (!temporaryTimer) {
        noticeMessage.textContent = defaultMessage;
      }
    };
    const setTemporary = (msg, duration = 3e3) => {
      if (temporaryTimer) {
        clearTimeout(temporaryTimer);
      }
      noticeMessage.textContent = msg;
      temporaryTimer = window.setTimeout(() => {
        noticeMessage.textContent = defaultMessage;
        temporaryTimer = null;
      }, duration);
    };
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
      restoreDefault
    });
  };
  function getCurrentTrackInfo() {
    var _a, _b;
    const titleEl = document.querySelector(
      ".title.ytmusic-player-bar"
    );
    const artistEl = document.querySelector(
      "yt-formatted-string.byline.ytmusic-player-bar > a[href^='channel/']"
    );
    const title = ((_a = titleEl == null ? void 0 : titleEl.textContent) == null ? void 0 : _a.trim()) ?? "";
    const artist = ((_b = artistEl == null ? void 0 : artistEl.textContent) == null ? void 0 : _b.trim()) ?? "";
    return { title, artist };
  }
  function geniusSearch(mode = "both") {
    const { title, artist } = getCurrentTrackInfo();
    let query = "";
    if (mode === "both") query = `${title} ${artist}`;
    else if (mode === "title") query = title;
    else query = artist;
    query = query.trim().replace(/\s+/g, " ");
    const q = encodeURIComponent(query);
    const url = `https://genius.com/search?q=${q}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
  const createGeniusButton = () => {
    const geniusButton = document.createElement("button");
    geniusButton.type = "button";
    geniusButton.title = `${messages.geniusSearchButtonTitle} (4)`;
    geniusButton.setAttribute("aria-haspopup", "menu");
    geniusButton.setAttribute("aria-expanded", "false");
    geniusButton.style.cssText = `
    width: 24px; 
    height: 24px; 
    border-radius: 12px; 
    position: relative; 
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    border: none; 
    padding: 0; 
    background: transparent; 
    cursor: pointer; 
    transition: 0.3s ease;
  `;
    geniusButton.addEventListener("mouseenter", () => {
      geniusButton.style.transform = "scale(1.2)";
    });
    geniusButton.addEventListener("mouseleave", () => {
      geniusButton.style.transform = "scale(1)";
    });
    const geniusIcon = document.createElement("img");
    geniusIcon.alt = "Genius";
    geniusIcon.src = "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/assets/genius.webp";
    geniusIcon.style.cssText = `
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: contain;
    user-drag: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
  `;
    geniusIcon.addEventListener("mouseenter", () => {
      geniusIcon.style.transform = "scale(1.05)";
    });
    geniusIcon.addEventListener("mouseleave", () => {
      geniusIcon.style.transform = "scale(1)";
    });
    const geniusMenu = document.createElement("div");
    geniusMenu.setAttribute("role", "menu");
    geniusMenu.style.cssText = ` position: absolute;
    display: none;
    flex-direction: column;
    gap: 8px;
    bottom: 40px;
    right: -50px;
    z-index: 100;
    padding: 8px;
    background: rgba(10, 10, 15, 0.85);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow:
      rgba(0, 0, 0, 0.8) 0px 20px 40px,
      rgba(255, 255, 255, 0.05) 0px 1px 0px inset;
    backdrop-filter: blur(10px) saturate(180%);
  `;
    const createGeniusMenuItem = (label, mode, emoji) => {
      const geniusMenuItem = document.createElement("button");
      geniusMenuItem.type = "button";
      geniusMenuItem.textContent = emoji;
      geniusMenuItem.title = label;
      geniusMenuItem.setAttribute("role", "menuitem");
      geniusMenuItem.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(40, 40, 40, 0.8);
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
      geniusMenuItem.addEventListener("mouseenter", () => {
        geniusMenuItem.style.background = "rgba(255, 255, 255, 0.1)";
        geniusMenuItem.style.borderColor = "rgba(255, 255, 255, 0.2)";
        geniusMenuItem.style.transform = "scale(1.05)";
      });
      geniusMenuItem.addEventListener("mouseleave", () => {
        geniusMenuItem.style.background = "rgba(40, 40, 40, 0.8)";
        geniusMenuItem.style.borderColor = "transparent";
        geniusMenuItem.style.transform = "scale(1)";
      });
      geniusMenuItem.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
        geniusSearch(mode);
      });
      return geniusMenuItem;
    };
    geniusMenu.appendChild(
      createGeniusMenuItem(`${messages.geniusSearchBoth}`, "both", "🎶")
    );
    geniusMenu.appendChild(
      createGeniusMenuItem(`${messages.geniusSearchTitle}`, "title", "🎵")
    );
    geniusMenu.appendChild(
      createGeniusMenuItem(`${messages.geniusSearchArtist}`, "artist", "👤")
    );
    const openMenu = () => {
      geniusMenu.style.display = "flex";
      geniusButton.setAttribute("aria-expanded", "true");
      setTimeout(() => {
        document.addEventListener("click", onDocClick, { capture: true });
      }, 0);
    };
    const closeMenu = () => {
      geniusMenu.style.display = "none";
      geniusButton.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", onDocClick, { capture: true });
    };
    const onDocClick = (e) => {
      const t = e.target;
      if (geniusMenu.contains(t) || geniusButton.contains(t)) return;
      const ytmTsPanel = document.querySelector("#ytm-ts");
      if (ytmTsPanel && ytmTsPanel.contains(t)) return;
      closeMenu();
    };
    geniusButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (geniusMenu.style.display === "flex") closeMenu();
      else openMenu();
    });
    geniusButton.appendChild(geniusIcon);
    return { geniusButton, geniusMenu };
  };
  const openChatgpt = () => {
    const timestampsArr = Storage.loadTimestamps();
    const timestamps = timestampsArr.filter((item) => item != null).map(String).join("\n");
    const promptLines = [
      ...Array.isArray(messages.chatgptPrompt) ? messages.chatgptPrompt : [messages.chatgptPrompt],
      "---",
      "Timestamp",
      timestamps,
      "---",
      "Lyrics",
      ""
    ];
    const prompt = promptLines.join("\n").trimEnd() + "\n";
    const url = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
    window.open(url, "_blank");
  };
  const createChatgptButton = () => {
    const chatgptBtn = document.createElement("button");
    chatgptBtn.type = "button";
    chatgptBtn.title = `${messages.chatgptPromptButtonTitle} (5)`;
    chatgptBtn.style.cssText = `
    width: 24px;
    height: 24px;
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
    transition: transform 0.3s ease;
  `;
    chatgptBtn.addEventListener("mouseenter", () => {
      chatgptBtn.style.transform = "scale(1.2)";
    });
    chatgptBtn.addEventListener("mouseleave", () => {
      chatgptBtn.style.transform = "scale(1)";
    });
    chatgptBtn.addEventListener("click", () => {
      openChatgpt();
    });
    const chatgptIcon = document.createElement("img");
    chatgptIcon.alt = "ChatGPT";
    chatgptIcon.src = "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/assets/chatgpt.webp";
    chatgptIcon.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  `;
    chatgptBtn.appendChild(chatgptIcon);
    return chatgptBtn;
  };
  const createIndicatorButton = (onToggleAutoReset) => {
    const indicatorTrack = document.createElement("div");
    indicatorTrack.title = `${messages.toggleAutoResetButtonTitle} (9)`;
    indicatorTrack.style.cssText = `
    position: relative;
    width: 48px;
    height: 24px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    transform: scale(1);
  `;
    indicatorTrack.addEventListener("mouseenter", () => {
      indicatorTrack.style.transform = "scale(1.2)";
    });
    indicatorTrack.addEventListener("mouseleave", () => {
      indicatorTrack.style.transform = "scale(1)";
    });
    const indicatorCircle = document.createElement("div");
    indicatorCircle.style.cssText = `
    position: absolute;
    top: 3px;
    width: 18px;
    height: 18px;
    background: rgb(255, 255, 255);
    border-radius: 9px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 4.5px -1px;
    transition: 0.3s ease-in-out;
    z-index: 10;
    transform: translateX(24px);
    display: flex;
    align-items: center;
    justify-content: center;
  `;
    const indicatorDot = document.createElement("span");
    indicatorDot.style.cssText = `
    width: 6px;
    height: 6px;
    border-radius: 3px;
    transition: background-color 0.3s;
  `;
    const updateIndicator = (enabled2) => {
      indicatorTrack.style.background = enabled2 ? "rgb(255, 0, 51)" : "rgb(55, 65, 81)";
      indicatorTrack.style.boxShadow = enabled2 ? "rgba(16, 185, 129, 0.3) 0px 7.5px 11.25px -2.25px" : "rgba(55, 65, 81, 0.2) 0px 7.5px 11.25px -2.25px";
      indicatorCircle.style.transform = enabled2 ? "translateX(24px)" : "translateX(3px)";
      indicatorDot.style.background = enabled2 ? "rgb(255, 0, 51)" : "rgb(55, 65, 81)";
    };
    let enabled = Storage.getAutoResetEnabled();
    updateIndicator(enabled);
    indicatorTrack.addEventListener("click", () => {
      enabled = !enabled;
      Storage.setAutoResetEnabled(enabled);
      updateIndicator(enabled);
    });
    indicatorCircle.appendChild(indicatorDot);
    indicatorTrack.appendChild(indicatorCircle);
    return Object.assign(indicatorTrack, {
      _circle: indicatorCircle,
      _update: updateIndicator
    });
  };
  const createFooter = (onToggleAutoReset) => {
    const footer = document.createElement("div");
    footer.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    height: 36px;
    padding: 6px-top;
    margin-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
  `;
    const mediaButtonWrapper = document.createElement("div");
    mediaButtonWrapper.style.cssText = `
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  `;
    const notice = createNoticeWrapper();
    const genius = createGeniusButton();
    const chatgpt = createChatgptButton();
    const indicator = createIndicatorButton();
    mediaButtonWrapper.append(genius.geniusButton, chatgpt);
    footer.append(notice, mediaButtonWrapper, indicator, genius.geniusMenu);
    return Object.assign(footer, {
      _notice: notice,
      _indicator: indicator._circle,
      _updateIndicator: indicator._update
    });
  };
  class Panel {
    constructor(actions) {
      this.dragging = false;
      this.dx = 0;
      this.dy = 0;
      this.element = this.createElement();
      const header = createHeader(
        this.handleDragStart.bind(this),
        () => this.setVisible(false)
      );
      const main = createContent(actions);
      this.listBox = main.listBox;
      this.footer = createFooter();
      this.element.append(header, main.element, this.footer);
      this.setupDragEvents();
      this.setVisible(Storage.getVisibility());
      document.body.appendChild(this.element);
    }
    createElement() {
      var _a;
      const EXISTING_ID = "ytm-ts";
      (_a = document.getElementById(EXISTING_ID)) == null ? void 0 : _a.remove();
      const panel = document.createElement("div");
      panel.id = EXISTING_ID;
      const savedPosition = Storage.getPosition();
      panel.style.cssText = `
      position: fixed;
      ${savedPosition ? `top:${savedPosition.top}px;left:${savedPosition.left}px;` : `top:400px;left:400px;`}
      z-index: calc(infinity);
      display: none;
      background: rgba(10, 10, 15, 0.75);
      color: rgb(240, 240, 245);
      padding-inline: 12px;
      padding-bottom: 12px;
      border-radius: 16px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
      font-size: 13px;
      width: 260px;
      box-shadow:
        rgba(0, 0, 0, 0.8) 0px 20px 40px,
        rgba(255, 255, 255, 0.05) 0px 1px 0px inset;
      backdrop-filter: blur(10px) saturate(180%);
      user-select: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
      return panel;
    }
    handleDragStart(e) {
      this.dragging = true;
      this.dx = e.clientX - this.element.offsetLeft;
      this.dy = e.clientY - this.element.offsetTop;
      this.element.style.transition = "none";
    }
    setupDragEvents() {
      const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
      document.addEventListener("mousemove", (e) => {
        if (!this.dragging) return;
        const left = clamp(
          e.clientX - this.dx,
          6,
          window.innerWidth - this.element.offsetWidth - 6
        );
        const top = clamp(
          e.clientY - this.dy,
          6,
          window.innerHeight - this.element.offsetHeight - 6
        );
        Object.assign(this.element.style, {
          left: left + "px",
          top: top + "px",
          right: "auto",
          bottom: "auto"
        });
      });
      const endDrag = () => {
        if (!this.dragging) return;
        this.dragging = false;
        Storage.savePosition({
          left: this.element.offsetLeft,
          top: this.element.offsetTop
        });
        this.element.style.transition = "";
      };
      document.addEventListener("mouseup", endDrag);
      window.addEventListener("resize", () => {
        const left = clamp(
          this.element.offsetLeft,
          6,
          window.innerWidth - this.element.offsetWidth - 6
        );
        const top = clamp(
          this.element.offsetTop,
          6,
          window.innerHeight - this.element.offsetHeight - 6
        );
        this.element.style.left = left + "px";
        this.element.style.top = top + "px";
      });
    }
    setVisible(visible) {
      this.element.style.display = visible ? "block" : "none";
      Storage.saveVisibility(visible);
    }
    toggleVisibility() {
      const isVisible = this.element.style.display !== "none";
      this.setVisible(!isVisible);
    }
    updateTimestampList(timestamps) {
      updateListBoxNotice(this.listBox, timestamps, this.footer._notice);
    }
    setNotice(message) {
      this.footer._notice.setMessage(message);
    }
    clearNotice() {
      this.footer._notice.clear();
    }
  }
  class TimestampActions {
    constructor(panel) {
      this.timestamps = [];
      this.noticeTimeout = null;
      this.resetManager = null;
      this.add = () => {
        const video = document.querySelector("video");
        if (!video) return;
        this.timestamps.push(this.formatTime(video.currentTime));
        this.updateDisplay();
      };
      this.addSpace = () => {
        this.timestamps.push("");
        this.updateDisplay();
      };
      this.undo = () => {
        var _a;
        if (this.timestamps.length) {
          this.timestamps.pop();
          this.updateDisplay();
          if ((_a = this.resetManager) == null ? void 0 : _a.isPendingReset()) {
            this.resetManager.cancelReset();
          }
        }
      };
      this.copy = () => {
        var _a;
        if (!this.timestamps.length) {
          this.setTemporaryNotice(messages.nothing);
          return;
        }
        const text = this.timestamps.join("\n");
        try {
          GM_setClipboard(text);
          this.setTemporaryNotice(messages.copied);
        } catch {
          (_a = navigator.clipboard) == null ? void 0 : _a.writeText(text).then(() => {
            this.setTemporaryNotice(messages.copied);
          });
        }
      };
      this.clear = () => {
        var _a;
        if ((_a = this.resetManager) == null ? void 0 : _a.isPendingReset()) {
          this.resetManager.cancelReset();
        }
        this.timestamps = [];
        this.updateDisplay();
        this.clearNotice();
      };
      this.panel = panel;
      this.timestamps = Storage.loadTimestamps();
      this.updateDisplay();
    }
    // ResetManagerの参照を設定
    setResetManager(resetManager) {
      this.resetManager = resetManager;
    }
    formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      const cs = Math.floor(seconds % 1 * 100);
      return `[${String(m).padStart(2, "0")}:${String(s).padStart(
        2,
        "0"
      )}.${String(cs).padStart(2, "0")}] `;
    }
    updateDisplay() {
      this.panel.updateTimestampList(this.timestamps);
      Storage.saveTimestamps(this.timestamps);
    }
    clearNoticeTimeout() {
      if (this.noticeTimeout) {
        clearTimeout(this.noticeTimeout);
        this.noticeTimeout = null;
      }
    }
    setTemporaryNotice(message, duration = 1500) {
      this.clearNoticeTimeout();
      this.panel.setNotice(message);
      this.noticeTimeout = window.setTimeout(() => {
        this.panel.clearNotice();
        this.noticeTimeout = null;
      }, duration);
    }
    // リセットカウントダウン通知を表示
    showResetCountdown(countdown) {
      this.clearNoticeTimeout();
      const message = messages.noticeReset.replace("{}", countdown.toString());
      this.panel.setNotice(message);
    }
    // オートリセット無効通知を表示
    showAutoResetDisabled() {
      this.setTemporaryNotice(messages.toggleAutoReset, 2e3);
    }
    // 通知をクリア
    clearNotice() {
      this.clearNoticeTimeout();
      this.panel.clearNotice();
    }
    showTemporaryNotice(message, duration) {
      this.setTemporaryNotice(message, duration);
    }
    getTimestamps() {
      return this.timestamps;
    }
    hasTimestamps() {
      return this.timestamps.length > 0;
    }
    reset() {
      this.timestamps = [];
      this.updateDisplay();
      this.clearNotice();
    }
    //  インスタンス破棄時の清理処理
    dispose() {
      this.clearNoticeTimeout();
    }
  }
  class ResetManager {
    constructor(actions) {
      this.currentTrackTitle = null;
      this.resetTimeout = null;
      this.countdownInterval = null;
      this.pendingReset = false;
      this.resetCountdown = 0;
      this.actions = actions;
      this.initTitle();
      this.setupTrackDetection();
      this.setupManualResetDetection();
    }
    getTitleText() {
      var _a;
      const t = document.querySelector("ytmusic-player-bar .title");
      return ((_a = t == null ? void 0 : t.textContent) == null ? void 0 : _a.trim()) || null;
    }
    initTitle() {
      const t = this.getTitleText();
      if (t) this.currentTrackTitle = t;
    }
    cancelPendingReset() {
      if (this.resetTimeout) clearTimeout(this.resetTimeout);
      if (this.countdownInterval) clearInterval(this.countdownInterval);
      this.resetTimeout = null;
      this.countdownInterval = null;
      this.pendingReset = false;
      this.resetCountdown = 0;
      this.actions.clearNotice();
    }
    scheduleResetIfNeeded() {
      if (!this.actions.hasTimestamps()) return;
      if (!Storage.getAutoResetEnabled()) return;
      this.cancelPendingReset();
      this.pendingReset = true;
      this.resetCountdown = 5;
      this.actions.showResetCountdown(this.resetCountdown);
      this.countdownInterval = window.setInterval(() => {
        if (!Storage.getAutoResetEnabled()) {
          this.cancelPendingReset();
          this.actions.showAutoResetDisabled();
          return;
        }
        this.resetCountdown--;
        if (this.resetCountdown > 0) {
          this.actions.showResetCountdown(this.resetCountdown);
        }
      }, 1e3);
      this.resetTimeout = window.setTimeout(() => {
        if (this.actions.hasTimestamps()) {
          this.actions.reset();
        }
        this.pendingReset = false;
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
          this.countdownInterval = null;
        }
        this.actions.clearNotice();
      }, 5e3);
    }
    // 手動リセットの検出
    setupManualResetDetection() {
      let previousTimestampCount = this.actions.hasTimestamps() ? this.actions.getTimestamps().length : 0;
      const checkManualReset = () => {
        const currentTimestampCount = this.actions.hasTimestamps() ? this.actions.getTimestamps().length : 0;
        if (this.pendingReset && previousTimestampCount > 0 && currentTimestampCount === 0) {
          this.cancelPendingReset();
        }
        previousTimestampCount = currentTimestampCount;
      };
      setInterval(checkManualReset, 100);
    }
    // pendingResetの状態を取得
    isPendingReset() {
      return this.pendingReset;
    }
    setupTrackDetection() {
      const mo = new MutationObserver(() => {
        const t = this.getTitleText();
        if (!t) return;
        if (this.currentTrackTitle === null) {
          this.currentTrackTitle = t;
          return;
        }
        if (t !== this.currentTrackTitle) {
          this.currentTrackTitle = t;
          this.scheduleResetIfNeeded();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      window.addEventListener(
        "yt-page-data-updated",
        () => {
          this.initTitle();
        },
        { passive: true }
      );
    }
    // 外部からリセットキャンセルを可能にする
    cancelReset() {
      this.cancelPendingReset();
    }
    toggleAutoReset() {
      const newState = !Storage.getAutoResetEnabled();
      Storage.setAutoResetEnabled(newState);
      if (!newState) {
        this.cancelPendingReset();
        this.actions.showAutoResetDisabled();
      } else {
        this.actions.clearNotice();
      }
    }
    //  インスタンス破棄時の清理処理
    dispose() {
      this.cancelPendingReset();
    }
  }
  const KEY_BINDINGS = {
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
    w: "seekRewind3s",
    e: "seekForward3s",
    ArrowLeft: "seekRewind5s",
    ArrowRight: "seekForward5s"
  };
  const SEEK_INTERVAL_SHORT = 3;
  const SEEK_INTERVAL_MEDIUM = 5;
  class ShortcutManager {
    constructor(panel, actions, resetManager) {
      this.panel = panel;
      this.actions = actions;
      this.resetManager = resetManager;
      this.setupShortcuts();
    }
    setupShortcuts() {
      document.addEventListener("keydown", (e) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLElement && e.target.contentEditable === "true") {
          return;
        }
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
            const linkSelector = 'div.blyrics-footer__container > a[href^="https://lrclibup.boidu.dev/"]';
            const buttonSelector = "button.blyrics-add-lyrics-button";
            const openLink = document.querySelector(linkSelector);
            if (openLink) {
              window.open(openLink.href, "_blank", "noopener,noreferrer");
            } else {
              const openButton = document.querySelector(buttonSelector);
              if (openButton) {
                openButton.click();
              }
            }
            break;
          }
          case "panelToggle":
            this.panel.toggleVisibility();
            break;
          case "seekRewind3s":
            this.seek(-SEEK_INTERVAL_SHORT);
            break;
          case "seekForward3s":
            this.seek(SEEK_INTERVAL_SHORT);
            break;
          case "seekRewind5s":
            this.seek(-SEEK_INTERVAL_MEDIUM);
            break;
          case "seekForward5s":
            this.seek(SEEK_INTERVAL_MEDIUM);
            break;
        }
      });
    }
    seek(seconds) {
      const video = document.querySelector("video");
      if (video) {
        video.currentTime = Math.max(0, video.currentTime + seconds);
      }
    }
    toggleAutoReset() {
      var _a;
      const current = Storage.getAutoResetEnabled();
      const next = !current;
      Storage.setAutoResetEnabled(next);
      if (!next) {
        this.resetManager.cancelReset();
      }
      const update = (_a = this.panel.footer) == null ? void 0 : _a._updateIndicator;
      update == null ? void 0 : update(next);
    }
    // Tampermonkey メニューコマンド
    setupMenuCommand() {
      GM_registerMenuCommand("Toggle Timestamp Panel", () => {
        this.panel.toggleVisibility();
      });
    }
  }
  class openPanel {
    constructor(panel) {
      this.panel = panel;
    }
    togglePanel() {
      this.panel.toggleVisibility();
    }
  }
  function createOpenPanelButton(controller) {
    const openYtmTsPanelContainer = document.createElement("div");
    openYtmTsPanelContainer.style.cssText = `
    display: inline-block;
  `;
    const openYtmTsPanelWrapper = document.createElement("div");
    openYtmTsPanelWrapper.id = "openYtmTsPanelWrapper";
    const openYtmTsPanel = document.createElement("button");
    openYtmTsPanel.className = "yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button yt-spec-button-shape-next--enable-backdrop-filter-experiment";
    openYtmTsPanel.type = "button";
    openYtmTsPanel.title = "Open Youtube Music Timestamp Panel";
    const openYtmTsPanelIcon = document.createElement("img");
    openYtmTsPanelIcon.alt = "Open Youtube Music Timestamp Panel";
    openYtmTsPanelIcon.src = "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/icons/vector/icon-vector-48.webp";
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
    const controls = document.querySelector(
      "div.middle-controls-buttons.ytmusic-player-bar"
    );
    if (controls) {
      controls.appendChild(openYtmTsPanelContainer);
    }
    return openYtmTsPanel;
  }
  (() => {
    GM_addStyle(`
    @import url("https://db.onlinewebfonts.com/c/494eee3143d83527124d62f383506d6e?family=Alternate+Gothic+W01+No+2");
  `);
    let panel;
    let actions;
    let resetManager;
    const createActionHandlers = () => ({
      onAdd: () => actions.add(),
      onSpace: () => actions.addSpace(),
      onUndo: () => actions.undo(),
      onCopy: () => actions.copy(),
      onClear: () => actions.clear()
    });
    try {
      if (false) ;
      panel = new Panel(createActionHandlers());
      actions = new TimestampActions(panel);
      resetManager = new ResetManager(actions);
      const shortcuts = new ShortcutManager(panel, actions, resetManager);
      shortcuts.setupMenuCommand();
      const panelController = new openPanel(panel);
      createOpenPanelButton(panelController);
      if (false) ;
    } catch (error) {
    }
  })();
})();
//# sourceMappingURL=userscript.user.js.map
