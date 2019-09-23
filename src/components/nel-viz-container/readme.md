# nel-viz-container



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                             | Type      | Default     |
| --------------- | ---------------- | ----------------------------------------------------------------------- | --------- | ----------- |
| `borderRadius`  | `border-radius`  | Sets the element's background border radius                             | `number`  | `5`         |
| `cx`            | `cx`             | Returns the centered x position                                         | `number`  | `undefined` |
| `cy`            | `cy`             | Returns the centered y position                                         | `number`  | `undefined` |
| `debug`         | `debug`          | If true, displays visible artefacts for ascertaining position, etc.     | `boolean` | `false`     |
| `disabled`      | `disabled`       | If false, element is partly greyed out and not responding to user input | `boolean` | `false`     |
| `height`        | `height`         | Sets the element's height                                               | `string`  | `"100%"`    |
| `paddingBottom` | `padding-bottom` | Sets the element's padding-bottom                                       | `number`  | `10`        |
| `paddingLeft`   | `padding-left`   | Sets the element's padding-left                                         | `number`  | `10`        |
| `paddingRight`  | `padding-right`  | Sets the element's padding-right                                        | `number`  | `10`        |
| `paddingTop`    | `padding-top`    | Sets the element's padding-top                                          | `number`  | `10`        |
| `rh`            | `rh`             | Sets the element's relative height                                      | `number`  | `undefined` |
| `rw`            | `rw`             | Sets the element's relative width                                       | `number`  | `undefined` |
| `width`         | `width`          | Sets the element's width                                                | `string`  | `"100%"`    |


## Events

| Event   | Description                                 | Type               |
| ------- | ------------------------------------------- | ------------------ |
| `ready` | Raised after element is rendered in the DOM | `CustomEvent<any>` |


## Methods

### `addElement(template: string, parent: string | Node) => Promise<void>`

Adds SVG element to container

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
