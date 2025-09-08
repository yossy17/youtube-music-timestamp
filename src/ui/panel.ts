import { Storage } from "../storage";
import { createHeader } from "./header";
import { createContent, ButtonActions } from "./content";
import { createFooter } from "./footer";

export class Panel {
  private element: HTMLElement;
  private listBox: HTMLElement;
  private updateListBox: (listBox: HTMLElement, timestamps: string[]) => void;
  private footer: HTMLElement & {
    _notice: any;
    _updateIndicator: (enabled: boolean) => void;
  };
  private dragging = false;
  private dx = 0;
  private dy = 0;

  constructor(actions: ButtonActions) {
    this.element = this.createElement();

    // パネルを構成
    const header = createHeader(this.handleDragStart.bind(this), () =>
      this.setVisible(false)
    );

    const main = createContent(actions);
    this.listBox = main.listBox;
    this.updateListBox = main.updateListBox;

    this.footer = createFooter();

    this.element.append(header, main.element, this.footer);

    // ドラッグイベントを設定
    this.setupDragEvents();

    // 初期状態を設定
    this.setVisible(Storage.getVisibility());

    document.body.appendChild(this.element);
  }

  private createElement(): HTMLElement {
    const EXISTING_ID = "ytm-ts";

    // 重複パネル防止
    document.getElementById(EXISTING_ID)?.remove();

    const panel = document.createElement("div");
    panel.id = EXISTING_ID;

    const savedPosition = Storage.getPosition();
    panel.style.cssText = `
      position: fixed;
      ${
        savedPosition
          ? `top:${savedPosition.top}px;left:${savedPosition.left}px;`
          : `bottom:100px;right:40px;`
      }
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

  private handleDragStart(e: MouseEvent): void {
    this.dragging = true;
    this.dx = e.clientX - this.element.offsetLeft;
    this.dy = e.clientY - this.element.offsetTop;
    this.element.style.transition = "none";
  }

  private setupDragEvents(): void {
    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

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
        bottom: "auto",
      });
    });

    const endDrag = () => {
      if (!this.dragging) return;
      this.dragging = false;
      Storage.savePosition({
        left: this.element.offsetLeft,
        top: this.element.offsetTop,
      });
      this.element.style.transition = "";
    };

    document.addEventListener("mouseup", endDrag);

    // ウィンドウリサイズ時のパネル位置調整
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

  setVisible(visible: boolean): void {
    this.element.style.display = visible ? "block" : "none";
    Storage.saveVisibility(visible);
  }

  toggleVisibility(): void {
    const isVisible = this.element.style.display !== "none";
    this.setVisible(!isVisible);
  }

  updateTimestampList(timestamps: string[]): void {
    this.updateListBox(this.listBox, timestamps);
  }

  setNotice(message: string): void {
    this.footer._notice.setMessage(message);
  }

  clearNotice(): void {
    this.footer._notice.clear();
  }
}
