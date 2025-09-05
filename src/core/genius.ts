export type GeniusSearchMode = "both" | "title" | "artist";

function getCurrentTrackInfo() {
  const titleEl = document.querySelector<HTMLElement>(
    ".title.ytmusic-player-bar"
  );
  const artistEl = document.querySelector<HTMLElement>(
    "yt-formatted-string.byline.ytmusic-player-bar > a[href^='channel/']"
  );
  const title = titleEl?.textContent?.trim() ?? "";
  const artist = artistEl?.textContent?.trim() ?? "";
  return { title, artist };
}

export function geniusSearch(mode: GeniusSearchMode = "both") {
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
