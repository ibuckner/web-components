import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

const nelListItemCss = ":host{max-height:inherit;max-width:inherit}:host([disabled]){cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}.selectable{cursor:pointer}.list-item{align-content:center;align-items:center;display:flex;flex-flow:row nowrap;justify-content:flex-start;margin:1px}.bullet{border-radius:50%;display:inline-block;height:0.8rem;width:0.8rem}.text{display:inline-block;margin-left:0.5rem}";

const ListItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.deleting = createEvent(this, "deleting", 7);
    this.deleted = createEvent(this, "deleted", 7);
    this.loaded = createEvent(this, "loaded", 6);
    this.selected = createEvent(this, "selected", 6);
    /**
     * Sets the bullet color of the element. Default is #eeeeee
     */
    this.color = "#eeeeee";
    /**
     * If true, allows the element to be delete using keyboard
     */
    this.deletable = false;
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
    /**
     * If true, allows the element to receive focus
     */
    this.selectable = false;
  }
  validateClear(newValue) {
    if (newValue) {
      this.deleted.emit(this.host);
      const parent = this.host.parentNode;
      parent.removeChild(this.host);
    }
  }
  componentDidLoad() {
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  onclick(ev) {
    if (this.disabled || !this.selectable) {
      ev.preventDefault();
      return;
    }
    if (this.host.classList.contains("selected")) {
      this.host.classList.remove("selected");
    }
    else {
      this.host.classList.add("selected");
    }
    this.selected.emit(this.host);
  }
  onKeyDown(ev) {
    if (this.disabled || !this.selectable || ev.keyCode === 229) {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      return;
    }
    if (this.deletable && ev.code === "Delete") {
      this.deleting.emit(this.host);
    }
  }
  render() {
    const tab = this.selectable ? 0 : undefined;
    const bcls = `bullet${this.selectable && !this.disabled ? " selectable" : ""}`;
    const tcls = `text${this.selectable && !this.disabled ? " selectable" : ""}`;
    const bst = {
      "background-color": this.color,
      border: `1px solid ${this.color}`
    };
    return (h("div", { class: "list-item", tabindex: tab }, h("div", { class: bcls, style: bst }), h("div", { class: tcls }, h("slot", null))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "clear": ["validateClear"]
  }; }
};
ListItem.style = nelListItemCss;

export { ListItem as nel_list_item };
