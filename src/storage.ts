// ストレージ定義
export const GM_POSITION_KEY = "ytm_ts_position";
export const GM_VISIBLE_KEY = "ytm_ts_visible";
export const SS_TIMESTAMPS_KEY = "ytm_ts_timestamps";
export const GM_AUTORESET_KEY = "ytm_ts_autoreset";

export interface Position {
  top: number;
  left: number;
}

export interface Settings {
  autoResetEnabled: boolean;
}

export const defaultSettings: Settings = {
  autoResetEnabled: true,
};

export class Storage {
  // SSからタイムスタンプデータ読み込み
  static loadTimestamps(): string[] {
    const added = sessionStorage.getItem(SS_TIMESTAMPS_KEY);
    return added ? JSON.parse(added) : [];
  }

  // SSにデータ保存
  static saveTimestamps(timestamps: string[]): void {
    sessionStorage.setItem(SS_TIMESTAMPS_KEY, JSON.stringify(timestamps));
  }

  // パネル位置の保存・読み込み
  static getPosition(): Position | null {
    const stored = GM_getValue(GM_POSITION_KEY, "{}");
    const position = JSON.parse(stored);
    if (Number.isFinite(position.top) && Number.isFinite(position.left)) {
      return position;
    }
    return null;
  }
  static savePosition(position: Position): void {
    GM_setValue(GM_POSITION_KEY, JSON.stringify(position));
  }

  // パネル表示状態の保存・読み込み
  static getVisibility(): boolean {
    return GM_getValue(GM_VISIBLE_KEY, false);
  }

  static saveVisibility(visible: boolean): void {
    GM_setValue(GM_VISIBLE_KEY, visible);
  }

  // AutoReset設定の保存・読み込み
  static getAutoResetEnabled(): boolean {
    return GM_getValue(GM_AUTORESET_KEY, false);
  }

  static setAutoResetEnabled(enabled: boolean): void {
    GM_setValue(GM_AUTORESET_KEY, enabled);
  }
}
