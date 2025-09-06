import { Panel } from "../ui/panel";

export class openPanel {
  private panel: Panel;

  constructor(panel: Panel) {
    this.panel = panel;
  }

  togglePanel(): void {
    this.panel.toggleVisibility();
  }
}
