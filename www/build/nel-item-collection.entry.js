import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

const nelItemCollectionCss = ":host{max-height:inherit;max-width:inherit}:host([disabled]),:host([disabled])>.item-collection{cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}.item-collection:focus{outline:none}.item-collection{box-sizing:border-box;display:flex;height:100%;max-height:inherit;min-width:inherit;min-height:1rem;min-width:4rem;width:100%}.horizontal{align-items:flex-start;flex-flow:row nowrap;justify-content:flex-start;overflow-x:auto;overflow-y:hidden}.resize-horizontal:focus{border:dashed 1px #ccc;resize:horizontal}.resize-vertical:focus{border:dashed 1px #ccc;resize:vertical}.vertical{align-items:flex-start;flex-flow:column nowrap;justify-content:flex-start;overflow-x:hidden;overflow-y:auto}";

const ItemCollection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.cleared = createEvent(this, "cleared", 6);
    this.loaded = createEvent(this, "loaded", 6);
    this.sorted = createEvent(this, "sorted", 6);
    /**
     * Aligns child elements within collection. Defaults to vertical list.
     */
    this.align = "vertical";
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
    /**
     * Displays the element resize handle (bottom right corner) if true
     */
    this.resizable = false;
    /**
     * Sorts child elements in collection based on text content
     */
    this.sort = "ASC";
  }
  validateHAlign(newValue) {
    this.align = newValue;
  }
  validateClear(newValue) {
    if (newValue) {
      for (let el of Array.from(this.host.children)) {
        this.host.removeChild(el);
      }
      this.cleared.emit(this.host);
      this.clear = false;
    }
  }
  validateSort(newValue) {
    const sorted = Array.from(this.host.children)
      .sort(newValue === "DESC"
      ? (a, b) => (a.textContent || "") > (b.textContent || "") ? -1 : 1
      : (a, b) => (a.textContent || "") > (b.textContent || "") ? 1 : -1);
    Array.from(this.host.children)
      .map(el => this.host.removeChild(el));
    sorted.map(el => this.host.appendChild(el));
    this.sort = newValue;
    this.sorted.emit(this.host);
  }
  componentDidLoad() {
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  render() {
    let cls = `item-collection ${this.align}`;
    cls += !this.disabled && this.resizable ? ` resize-${this.align}` : "";
    const tab = this.disabled ? undefined : 0;
    return (h("div", { class: cls, tabindex: tab }, h("slot", null)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "align": ["validateHAlign"],
    "clear": ["validateClear"],
    "sort": ["validateSort"]
  }; }
};
ItemCollection.style = nelItemCollectionCss;

export { ItemCollection as nel_item_collection };
