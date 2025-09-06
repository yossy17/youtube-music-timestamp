import { TimestampActions } from "./actions";
import { Storage } from "../storage";

export class ResetManager {
  private actions: TimestampActions;
  private currentTrackTitle: string | null = null;
  private resetTimeout: number | null = null;
  private countdownInterval: number | null = null;
  private pendingReset = false;
  private resetCountdown = 0;

  constructor(actions: TimestampActions) {
    this.actions = actions;
    this.initTitle();
    this.setupTrackDetection();
    this.setupManualResetDetection();
  }

  private getTitleText(): string | null {
    const t = document.querySelector("ytmusic-player-bar .title");
    return t?.textContent?.trim() || null;
  }

  private initTitle(): void {
    const t = this.getTitleText();
    if (t) this.currentTrackTitle = t;
  }

  private cancelPendingReset(): void {
    if (this.resetTimeout) clearTimeout(this.resetTimeout);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.resetTimeout = null;
    this.countdownInterval = null;
    this.pendingReset = false;
    this.resetCountdown = 0;
    this.actions.clearNotice();
  }

  private scheduleResetIfNeeded(): void {
    // 保存データがある場合のみリセット
    if (!this.actions.hasTimestamps()) return;
    if (!Storage.getAutoResetEnabled()) return;

    this.cancelPendingReset();
    this.pendingReset = true;
    this.resetCountdown = 5;

    // 即座に通知を更新
    this.actions.showResetCountdown(this.resetCountdown);

    // カウントダウンインターバル
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
    }, 1000);

    // 5秒後にリセット実行
    this.resetTimeout = window.setTimeout(() => {
      if (this.actions.hasTimestamps()) {
        this.actions.reset();
      }
      this.pendingReset = false;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
      // タイムアウト後に通知をクリア
      this.actions.clearNotice();
    }, 5000);
  }

  // 手動リセットの検出
  private setupManualResetDetection(): void {
    // TimestampActionsの状態変化を監視
    let previousTimestampCount = this.actions.hasTimestamps()
      ? this.actions.getTimestamps().length
      : 0;

    const checkManualReset = () => {
      const currentTimestampCount = this.actions.hasTimestamps()
        ? this.actions.getTimestamps().length
        : 0;

      // カウントダウン中にタイムスタンプが手動で削除された場合
      if (
        this.pendingReset &&
        previousTimestampCount > 0 &&
        currentTimestampCount === 0
      ) {
        this.cancelPendingReset();
      }

      previousTimestampCount = currentTimestampCount;
    };

    setInterval(checkManualReset, 100);
  }

  // pendingResetの状態を取得
  isPendingReset(): boolean {
    return this.pendingReset;
  }

  private setupTrackDetection(): void {
    // DOM変更監視（楽曲変更検出用）
    const mo = new MutationObserver(() => {
      const t = this.getTitleText();
      if (!t) return;

      if (this.currentTrackTitle === null) {
        this.currentTrackTitle = t;
        return;
      }

      if (t !== this.currentTrackTitle) {
        this.currentTrackTitle = t;
        // 保存データがある場合のみリセットスケジュール
        this.scheduleResetIfNeeded();
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    // ページルート変更時の安全処理
    window.addEventListener(
      "yt-page-data-updated",
      () => {
        this.initTitle();
      },
      { passive: true }
    );
  }

  // 外部からリセットキャンセルを可能にする
  cancelReset(): void {
    this.cancelPendingReset();
  }

  toggleAutoReset(): void {
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
  dispose(): void {
    this.cancelPendingReset();
  }
}
