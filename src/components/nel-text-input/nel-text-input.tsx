import { Component, Element, h, Listen, Prop, Watch } from "@stencil/core";

@Component({
  tag: "nel-text-input",
  styleUrl: "nel-text-input.css",
  shadow: true
})
export class TextInput {
  private _input: HTMLInputElement;
  private _mask: RegExp = /.*/;

  @Element() el: HTMLElement;

  /**
   * Declare if element is disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Text mask
   */
  @Prop({ reflect: true }) mask: string = "";

  /**
   * Maximum length
   */
  @Prop({ reflect: true }) maxlength: number = -1;

  /**
   * Minimum length
   */
  @Prop({ reflect: true }) minlength: number = -1;

  /**
   * Text pattern
   */
  @Prop({ reflect: true }) pattern: string = "";

  /**
   * Text placeholder
   */
  @Prop({ reflect: true }) placeholder: string = "";

  /**
   * Text value
   */
  @Prop({ reflect: true }) value: string = "";

  @Watch("mask")
  validateMask(newValue: string): void {
    this._mask = new RegExp(newValue);
  }

  componentDidLoad(): void {
    this._input = this.el.shadowRoot.querySelector("input");
    this._mask = new RegExp(this.mask);
  }

  @Listen("input")
  handleInput(): void {
    this.value = this._input.value;
  }

  @Listen("keydown")
  handleKeyDown(ev: KeyboardEvent): boolean {
    if (this.disabled || ev.isComposing || ev.keyCode === 229) { return false; }
    if (!this._editKeyPressed(ev) && !this._mask.test(ev.key)) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
  }

  @Listen("paste")
  handlePaste(ev: ClipboardEvent): boolean {
    if (!this.disabled && ev.clipboardData) {
      const paste: string = ev.clipboardData.getData("text/plain");
      if (!this._mask.test(paste)) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
    }
  }

  private _editKeyPressed(ev: KeyboardEvent): boolean {
    return ev.code === "Delete" || ev.code === "Backspace" ||
           ev.code === "ArrowLeft" || ev.code === "ArrowRight" ||
           ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey;
  }

  render(): any {
    return (
      <input type="search"
        maxlength={this.maxlength}
        minlength={this.minlength}
        pattern={this.pattern}
        placeholder={this.placeholder}
        value={this.value}>
      </input>
    );
  }
}
