interface MediaButtons {
  url: string;
  title: string;
  imgSrc: string;
  style?: Partial<CSSStyleDeclaration>;
}

const mediaButtons: MediaButtons[] = [
  {
    url: "https://github.com/yossy17/youtube-music-timestamp",
    title: "GitHub",
    imgSrc:
      "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/assets/github.webp",
  },
  {
    url: "https://x.com/yos_sy17",
    title: "Twitter",
    imgSrc:
      "https://github.com/yossy17/youtube-music-timestamp/raw/master/images/assets/twitter.webp",
  },
];

export const createMediaButton = (): HTMLElement => {
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
