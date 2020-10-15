import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

const nelExpandItemCss = ":host{width:100%}:host([disabled]),:host([disabled])>details{cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}details{display:block;line-height:1.5;margin:0;padding:0;width:100%}summary{align-items:center;cursor:pointer;display:flex;justify-content:center;margin:0;padding:0.5rem 0.5rem 0.5rem 1rem}summary:focus{outline:none}summary::-webkit-details-marker{display:none}.title{width:100%}.title>::slotted(*){display:inline-block;padding-left:10px;user-select:none;vertical-align:middle}";

const ExpandItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closed = createEvent(this, "closed", 7);
    this.loaded = createEvent(this, "loaded", 6);
    this.opened = createEvent(this, "opened", 7);
    this._size = 1 + (2 * 0.25);
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * If true, main contents of element are visible
     */
    this.open = false;
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
    /**
     * Adjusts the size of the marker, using CSS rem units of measurement
     */
    this.size = 2;
  }
  validateOpen(newValue) {
    if (Boolean(newValue)) {
      this.opened.emit(this.host);
    }
    else {
      this.closed.emit(this.host);
    }
  }
  validateSize(newValue) {
    if (+newValue > 0 && +newValue < 11) {
      this._size = 1 + (Math.ceil(+newValue) * 0.25);
    }
  }
  componentDidLoad() {
    const su = this.host.shadowRoot.querySelector("summary");
    const dt = this.host.shadowRoot.querySelector("details");
    su.addEventListener("click", (ev) => {
      if (this.disabled) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
      return true;
    });
    dt.addEventListener("toggle", (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return false;
    });
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  onClick(ev) {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    const e = ev.target;
    if (e.slot === "title" || e.tagName === "NEL-EXPAND-ITEM") {
      this.open = !this.host.open;
    }
    return true;
  }
  onKeyDown(ev) {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    if (ev.keyCode === 229) {
      return false;
    }
    switch (ev.code) {
      case "Space":
        this.open = !this.open;
        break;
    }
    return true;
  }
  render() {
    const tab = this.disabled ? undefined : 0;
    const contentStyle = {
      padding: `0.75rem 0.75rem 0.75rem ${this._size + 1.5}rem`
    };
    const iconStyle = {
      "background-image": this.open
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='${this._size}rem' width='${this._size}rem' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23005eb8'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A")`
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='${this._size}rem' width='${this._size}rem' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23005eb8'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M12 8v8M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A")`,
      "background-position": "center",
      "background-repeat": "no-repeat",
      "border-radius": "50%",
      height: `${this._size}rem`,
      width: `${this._size}rem`
    };
    return (h("details", { tabindex: tab, open: this.open }, h("summary", { role: "button", tabindex: "-1" }, h("div", { class: "icon", style: iconStyle }, h("slot", { name: "icon" })), h("div", { class: "title" }, h("slot", { name: "title" }))), h("div", { class: "content", style: contentStyle }, h("slot", { name: "content" }))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "open": ["validateOpen"],
    "size": ["validateSize"]
  }; }
};
ExpandItem.style = nelExpandItemCss;

export { ExpandItem as nel_expand_item };
