import { Storage } from "../storage";
import { messages } from "../i18n";
import { Panel } from "../ui/panel";

export class TimestampActions {
  private timestamps: string[] = [];
  private panel: Panel;

  constructor(panel: Panel) {
    this.panel = panel;
    this.timestamps = Storage.loadTimestamps();
    this.updateDisplay();
  }

  private formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const cs = Math.floor((seconds % 1) * 100); // センチ秒
    return `[${String(m).padStart(2, "0")}:${String(s).padStart(
      2,
      "0"
    )}.${String(cs).padStart(2, "0")}] `;
  }

  private updateDisplay(): void {
    this.panel.updateTimestampList(this.timestamps);
    Storage.saveTimestamps(this.timestamps);
  }

  add = (): void => {
    const video = document.querySelector("video");
    if (!video) return;

    this.timestamps.push(this.formatTime(video.currentTime));
    this.updateDisplay();
  };

  undo = (): void => {
    if (this.timestamps.length) {
      this.timestamps.pop();
      this.updateDisplay();
    }
  };

  addSpace = (): void => {
    this.timestamps.push("");
    this.updateDisplay();
  };

  copy = (): void => {
    if (!this.timestamps.length) {
      this.panel.setNotice(messages.nothing);
      return;
    }

    const text = this.timestamps.join("\n");
    try {
      GM_setClipboard(text);
      this.panel.setNotice(messages.copied);
      setTimeout(() => {
        // リセット中でなければ通知をクリア
        if (!this.panel.isPendingReset()) {
          this.panel.clearNotice();
        }
      }, 1500);
    } catch {
      // フォールバック
      navigator.clipboard?.writeText(text).then(() => {
        this.panel.setNotice(messages.copied);
        setTimeout(() => {
          // リセット中でなければ通知をクリア
          if (!this.panel.isPendingReset()) {
            this.panel.clearNotice();
          }
        }, 1500);
      });
    }
  };

  clear = (): void => {
    this.timestamps = [];
    this.updateDisplay();
    this.panel.clearNotice();
  };

  getTimestamps(): string[] {
    return this.timestamps;
  }

  hasTimestamps(): boolean {
    return this.timestamps.length > 0;
  }

  reset(): void {
    this.timestamps = [];
    this.updateDisplay();
  }
}
