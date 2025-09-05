export class NoticeManager {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.style.cssText = `
      font-size: 12px;
      color: rgba(255, 136, 136, 0.8);
      font-weight: bold;
      min-height: 1em;
      text-shadow: 0px 0px 8px rgba(255, 136, 136, 0.3);
    `;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setMessage(msg: string): void {
    this.element.textContent = msg || "";
  }

  clear(): void {
    this.element.textContent = "";
  }
}
