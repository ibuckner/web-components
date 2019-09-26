# nel-text-tag



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                             | Type      | Default     |
| ------------ | ------------ | ----------------------------------------------------------------------- | --------- | ----------- |
| `color`      | `color`      | Sets the background color of the element                                | `string`  | `"#eeeeee"` |
| `deletable`  | `deletable`  | If true, allows the element to be delete using keyboard                 | `boolean` | `false`     |
| `disabled`   | `disabled`   | If false, element is partly greyed out and not responding to user input | `boolean` | `false`     |
| `label`      | `label`      | Sets the text label  to be applied to the element                       | `string`  | `""`        |
| `ready`      | `ready`      | True when element can correctly respond to external programmatic access | `boolean` | `false`     |
| `selectable` | `selectable` | If true, allows the element to receive focus                            | `boolean` | `false`     |


## Events

| Event      | Description                                                              | Type               |
| ---------- | ------------------------------------------------------------------------ | ------------------ |
| `deleted`  | Fired after element is removed from DOM                                  | `CustomEvent<any>` |
| `deleting` | Fired before element is removed from DOM                                 | `CustomEvent<any>` |
| `loaded`   | Fired when element can correctly respond to external programmatic access | `CustomEvent<any>` |
| `selected` | Fired after element receives focus                                       | `CustomEvent<any>` |


## Methods

### `delete() => Promise<boolean>`

Removes element from DOM

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
