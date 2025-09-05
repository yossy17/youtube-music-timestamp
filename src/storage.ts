// ストレージ定義
export const GM_POSITION_KEY = "ytm_ts_position";
export const GM_VISIBLE_KEY = "ytm_ts_visible";
export const SS_TIMESTAMPS_KEY = "ytm_ts_timestamps";

export interface Position {
  top: number;
  left: number;
}

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
}
