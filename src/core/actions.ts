import { Storage } from "../storage";
import { messages } from "../i18n";
import { Panel } from "../ui/panel";

export class TimestampActions {
  private timestamps: string[] = [];
  private panel: Panel;
  private noticeTimeout: number | null = null;
  private resetManager: any = null;

  constructor(panel: Panel) {
    this.panel = panel;
    this.timestamps = Storage.loadTimestamps();
    this.updateDisplay();
  }

  // ResetManagerの参照を設定
  setResetManager(resetManager: any): void {
    this.resetManager = resetManager;
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

  private clearNoticeTimeout(): void {
    if (this.noticeTimeout) {
      clearTimeout(this.noticeTimeout);
      this.noticeTimeout = null;
    }
  }

  private setTemporaryNotice(message: string, duration: number = 1500): void {
    this.clearNoticeTimeout();
    this.panel.setNotice(message);
    this.noticeTimeout = window.setTimeout(() => {
      this.panel.clearNotice();
      this.noticeTimeout = null;
    }, duration);
  }

  // リセットカウントダウン通知を表示
  showResetCountdown(countdown: number): void {
    this.clearNoticeTimeout(); // 既存のタイマーをクリア
    const message = messages.noticeReset.replace("{}", countdown.toString());
    this.panel.setNotice(message);
  }

  // オートリセット無効通知を表示
  showAutoResetDisabled(): void {
    this.setTemporaryNotice(messages.toggleAutoReset, 2000);
  }

  // 通知をクリア
  clearNotice(): void {
    this.clearNoticeTimeout();
    this.panel.clearNotice();
  }

  showTemporaryNotice(message: string, duration?: number): void {
    this.setTemporaryNotice(message, duration);
  }

  add = (): void => {
    const video = document.querySelector("video");
    if (!video) return;

    this.timestamps.push(this.formatTime(video.currentTime));
    this.updateDisplay();
  };

  addSpace = (): void => {
    this.timestamps.push("");
    this.updateDisplay();
  };

  undo = (): void => {
    if (this.timestamps.length) {
      this.timestamps.pop();
      this.updateDisplay();

      // 手動操作でカウントダウン中なら取り消し
      if (this.resetManager?.isPendingReset()) {
        this.resetManager.cancelReset();
      }
    }
  };

  copy = (): void => {
    if (!this.timestamps.length) {
      this.setTemporaryNotice(messages.nothing);
      return;
    }

    const text = this.timestamps.join("\n");
    try {
      GM_setClipboard(text);
      this.setTemporaryNotice(messages.copied);
    } catch {
      navigator.clipboard?.writeText(text).then(() => {
        this.setTemporaryNotice(messages.copied);
      });
    }
  };

  clear = (): void => {
    // 手動リセット時にカウントダウンをキャンセル
    if (this.resetManager?.isPendingReset()) {
      this.resetManager.cancelReset();
    }

    this.timestamps = [];
    this.updateDisplay();
    this.clearNotice();
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
    this.clearNotice();
  }

  //  インスタンス破棄時の清理処理
  dispose(): void {
    this.clearNoticeTimeout();
  }
}
