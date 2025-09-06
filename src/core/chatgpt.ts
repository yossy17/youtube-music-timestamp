import { messages } from "./../i18n";
import { Storage } from "./../storage";

export const openChatgpt = (): void => {
  const timestampsArr: unknown[] = Storage.loadTimestamps();
  const timestamps = timestampsArr
    .filter((item) => item != null)
    .map(String)
    .join("\n");

  const promptLines = [
    ...(Array.isArray(messages.chatgptPrompt)
      ? messages.chatgptPrompt
      : [messages.chatgptPrompt]),
    "---",
    "Timestamp",
    timestamps,
    "---",
    "Lyrics",
    "",
  ];

  const prompt = promptLines.join("\n").trimEnd() + "\n";

  const url = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
  window.open(url, "_blank");
};
