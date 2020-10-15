import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

const nelStatusBadgeCss = ":host([disabled]){cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}.status-badge{align-items:center;background-color:var(--background-color, #fff);border:1px solid var(--color, #330066);color:var(--color, #330066);display:flex;flex-direction:column;height:var(--height, 8rem);justify-content:space-between;margin:0.25rem;padding:0.25rem;width:var(--width, 8rem)}.status-badge>.icon{display:flex;flex-direction:row;justify-content:flex-end;width:100%}.status-badge>.label{font-variant-caps:all-small-caps;font-size:1.2rem;font-weight:bold}.status-badge>.text{font-size:2rem}.diamond{border:0.5rem solid transparent;border-bottom-color:#ff0000;height:0;position:relative;top:-0.5rem;width:0}.diamond:after{content:\"\";border:0.5rem solid transparent;border-top-color:#ff0000;height:0;left:-0.5rem;position:absolute;top:0.5rem;width:0}.triangle{width:0;height:0;border-left:0.5rem solid transparent;border-right:0.5rem solid transparent;border-bottom:1rem solid #ffd700}.circle{background:#009900;border-radius:50%;height:1rem;width:1rem}";

const StatusBadge = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loaded = createEvent(this, "loaded", 6);
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * Sets the text label to be applied to the element
     */
    this.label = "";
    /**
     * Sets the prefix label to be applied to the element
     */
    this.pre = "";
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
    /**
     * Sets the suffix label to be applied to the element
     */
    this.suf = "";
  }
  componentDidLoad() {
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  render() {
    const ico = this.rag === -1
      ? "diamond"
      : this.rag === 0
        ? "triangle"
        : this.rag === 1
          ? "circle"
          : "";
    return (h("div", { class: "status-badge" }, h("div", { class: "icon" }, h("div", { class: ico })), h("div", { class: "text" }, h("span", null, this.pre), h("slot", null), h("span", null, this.suf)), h("div", { class: "label" }, this.label ? " " + this.label : "")));
  }
  get host() { return getElement(this); }
};
StatusBadge.style = nelStatusBadgeCss;

export { StatusBadge as nel_status_badge };
