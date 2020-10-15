import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

/**
 * https://2ality.com/2019/10/shared-mutable-state.html
 * @param original
 */
function deepCopy(original) {
    if (Array.isArray(original)) {
        const copy = [];
        for (const [index, value] of original.entries()) {
            copy[index] = deepCopy(value);
        }
        return copy;
    }
    else if (typeof original === "object" && original !== null) {
        const copy = {};
        for (const [key, value] of Object.entries(original)) {
            copy[key] = deepCopy(value);
        }
        return copy;
    }
    else {
        return original;
    }
}

/**
 * Implements a basic queue
 */
class Queue {
    constructor(list) {
        this._ = [];
        /**
         * remove item from end of queue
         */
        this.leave = () => this._.length > 0 ? this._.pop() : null;
        /**
         * remove item from front of queue
         */
        this.next = () => this._.length > 0 ? this._.shift() : null;
        this.toArray = () => this._;
        if (Array.isArray(list)) {
            list.forEach(i => this._.push(i));
        }
    }
    get first() { return this._.length > 0 ? this._[0] : null; }
    get last() { return this._.length > 0 ? this._[this._.length - 1] : null; }
    get length() { return this._.length; }
    clear() {
        this._ = [];
        return this;
    }
    /**
     * join item to end of queue
     * @param item
     */
    join(item) { this._.push(item); return this; }
    /**
     * join item at front of queue
     * @param item
     */
    jump(item) { this._.unshift(item); return this; }
}

var SlicerModifier;
(function (SlicerModifier) {
    SlicerModifier[SlicerModifier["NO_KEY"] = 0] = "NO_KEY";
    SlicerModifier[SlicerModifier["CTRL_KEY"] = 1] = "CTRL_KEY";
    SlicerModifier[SlicerModifier["SHIFT_KEY"] = 2] = "SHIFT_KEY";
})(SlicerModifier || (SlicerModifier = {}));
class Slicer {
    constructor(list) {
        this._ = new Map();
        this._selectionCount = 0;
        if (list) {
            if (Array.isArray(list)) {
                list.forEach((item) => {
                    if (!this._.has(item)) {
                        this._.set(item, { filtered: false, selected: false });
                    }
                });
            }
            else if (!this._.has(list)) {
                this._.set(list, { filtered: false, selected: false });
            }
        }
    }
    get members() {
        const result = [];
        this._.forEach((value, key) => {
            result.push(key);
        });
        return result;
    }
    get selection() {
        const result = [];
        if (this._selectionCount > 0) {
            this._.forEach((value, key) => {
                if (value.selected) {
                    result.push(key);
                }
            });
        }
        return result;
    }
    /**
     * Add item to slicer
     * @param key
     */
    add(key) {
        if (!this._.has(key)) {
            let state = { filtered: false, selected: false };
            if (this._selectionCount > 0) {
                state.filtered = true;
            }
            this._.set(key, state);
        }
        return this;
    }
    /**
     * Removes all selections on the slicer
     */
    clear() {
        this._.forEach((_, key) => {
            this._.set(key, { filtered: false, selected: false });
        });
        this._selectionCount = 0;
        this.lastSelection = undefined;
        return this;
    }
    /**
     * Returns true if key already in data set
     * @param key - item to search
     */
    has(key) {
        return this._.has(key);
    }
    /**
     * Returns true if item is filtered
     * @param key - item to search for
     */
    isFiltered(key) {
        const item = this._.get(key);
        return item ? item.filtered : false;
    }
    /**
     * Returns true if item is selected
     * @param key - item to search for
     */
    isSelected(key) {
        const item = this._.get(key);
        return item ? item.selected : false;
    }
    /**
     * Remove item from slicer
     * @param key - item to remove
     */
    remove(key) {
        const state = this._.get(key);
        if (state && state.selected) {
            --this._selectionCount;
        }
        this._.delete(key);
        if (this._selectionCount === 0) {
            this.clear();
        }
        else if (this.lastSelection === key) {
            this.lastSelection = this.selection[0];
        }
        return this;
    }
    /**
     * Updates the slicer state
     * @param item - item selected by user
     * @param modifier - was any modifying key pressed
     */
    toggle(item, modifier = SlicerModifier.NO_KEY) {
        if (modifier === SlicerModifier.SHIFT_KEY) {
            return this.toggleRange(item);
        }
        else if (modifier === SlicerModifier.CTRL_KEY) {
            return this.toggleCumulative(item);
        }
        else {
            return this.toggleSingle(item);
        }
    }
    /**
     * Updates the slicer state using Ctrl key modifier
     * @param key - item selected by user
     */
    toggleCumulative(key) {
        const state = this._.get(key);
        if (state) {
            state.selected = !state.selected;
            if (state.selected) {
                ++this._selectionCount;
            }
            else {
                --this._selectionCount;
            }
            this._.set(key, state);
        }
        if (this._selectionCount === 0 || this._selectionCount === this._.size) {
            this.clear();
        }
        else {
            this._.forEach((value, key) => {
                value.filtered = !value.selected;
                this._.set(key, value);
            });
            this.lastSelection = key;
        }
        return this;
    }
    /**
     * Updates the slicer state using Shift key modifier
     * @param item - item selected by user
     */
    toggleRange(item) {
        if (item === this.lastSelection) {
            this.clear();
        }
        else {
            let state = 0;
            this._selectionCount = 0;
            this._.forEach((value, key) => {
                if (state === 1) { // in progress
                    if (item === key || this.lastSelection === key) { // signifies end of range choice
                        state = -1;
                    }
                    if (this.lastSelection === undefined) {
                        state = -1;
                        value = { filtered: true, selected: false };
                    }
                    else {
                        value = { filtered: false, selected: true };
                        ++this._selectionCount;
                    }
                }
                else if (state === 0) { // pending
                    if (item === key || this.lastSelection === key) {
                        state = 1;
                        value = { filtered: false, selected: true };
                        ++this._selectionCount;
                    }
                    else {
                        value = { filtered: true, selected: false };
                    }
                }
                else { // stopped
                    value = { filtered: true, selected: false };
                }
                this._.set(key, value);
            });
            this.lastSelection = item;
            if (this._selectionCount === 0 || this._selectionCount === this._.size) {
                this.clear();
            }
        }
        return this;
    }
    /**
     * Updates the slicer state without key modifier
     * @param item - item selected by user
     */
    toggleSingle(item) {
        const state = this._.get(item);
        if (state) {
            if (state.selected) {
                this.clear();
            }
            else {
                this._.forEach((value, key) => {
                    if (item === key) {
                        value.selected = !value.selected;
                        value.filtered = !value.selected;
                    }
                    else {
                        value = { filtered: true, selected: false };
                    }
                    this._.set(key, value);
                });
                this._selectionCount = 1;
                this.lastSelection = item;
            }
        }
        return this;
    }
}

/**
 * returns a set (unique) of values from an array
 * @param a - array of values
 */
function uniqueArray(a) {
    if (Array.isArray(a)) {
        const r = new Set();
        a.map(a => r.add(JSON.stringify(a)));
        const ar = [];
        r.forEach(v => ar.push(JSON.parse(v)));
        return ar;
    }
    else {
        return a;
    }
}

const nelSlicerCss = ":host{max-height:inherit;max-width:inherit}:host([disabled]),:host([disabled])>.slicer{cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}.slicer{align-items:stretch;border-color:var(--border-color, #000);border-style:var(--border-style, solid);border-width:var(--border-width, 1px);box-sizing:border-box;display:flex;flex-flow:column nowrap;flex-grow:1;justify-content:flex-start;max-height:inherit;min-width:inherit;min-height:1rem;min-width:4rem;overflow-x:hidden;overflow-y:auto;padding:var(--padding, 10px);width:var(--width, 100%)}.slicer:focus{outline:none}::slotted(.slicer-item){cursor:pointer;text-align:center;user-select:none}";

const Slicer$1 = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.cleared = createEvent(this, "cleared", 6);
    this.errored = createEvent(this, "errored", 6);
    this.loaded = createEvent(this, "loaded", 6);
    this.selected = createEvent(this, "selected", 6);
    this._slicer = new Slicer();
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.clear = false;
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
  }
  validateClear(newValue) {
    if (newValue) {
      this._slicer.clear();
      for (let el of Array.from(this.host.children)) {
        el.classList.remove("filtered");
        el.classList.remove("selected");
      }
      this.clear = false;
      this.cleared.emit(this.host);
    }
  }
  componentDidLoad() {
    const obs = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; ++i) {
        for (let j = 0; j < mutations[i].addedNodes.length; ++j) {
          const el = mutations[i].addedNodes[j];
          if (el.classList.contains("slicer-item")) {
            const item = el.textContent;
            if (this._slicer.has(item)) {
              if (el && el.parentNode) {
                el.parentNode.removeChild(el);
              }
              this.errored.emit(`Duplicate entry detected: ${item}`);
            }
            else {
              this._slicer.add(item);
            }
          }
        }
      }
    });
    obs.observe(this.host, { childList: true });
    for (let el of Array.from(this.host.children)) {
      this._slicer.add(el.textContent);
    }
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  onclick(ev) {
    if (this.disabled) {
      ev.preventDefault();
      return;
    }
    const el = ev.target;
    if (el.classList.contains("slicer-item")) {
      this._slicer.toggle(el.textContent, ev.shiftKey
        ? SlicerModifier.SHIFT_KEY
        : ev.ctrlKey
          ? SlicerModifier.CTRL_KEY
          : SlicerModifier.NO_KEY);
      const selection = this._slicer.selection;
      if (selection.length === 0) {
        this.clear = true;
      }
      else {
        for (let el of Array.from(this.host.children)) {
          if (selection.indexOf(el.textContent) === -1) {
            el.classList.add("filtered");
            el.classList.remove("selected");
          }
          else {
            el.classList.remove("filtered");
            el.classList.add("selected");
          }
        }
      }
      this.selected.emit(selection);
    }
  }
  render() {
    const tab = this.disabled ? undefined : 0;
    return (h("div", { class: "slicer", tabindex: tab }, h("slot", null)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "clear": ["validateClear"]
  }; }
};
Slicer$1.style = nelSlicerCss;

export { Slicer$1 as nel_slicer };
