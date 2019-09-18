# nel-list-item



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                             | Type      | Default     |
| ------------ | ------------ | ----------------------------------------------------------------------- | --------- | ----------- |
| `color`      | `color`      | Sets the bullet color of the element. Default is #eeeeee                | `string`  | `"#eeeeee"` |
| `deletable`  | `deletable`  | If true, allows the element to be delete using keyboard                 | `boolean` | `false`     |
| `disabled`   | `disabled`   | If false, element is partly greyed out and not responding to user input | `boolean` | `false`     |
| `selectable` | `selectable` | If true, allows the element to receive focus                            | `boolean` | `false`     |


## Events

| Event      | Description                               | Type               |
| ---------- | ----------------------------------------- | ------------------ |
| `deleted`  | Raised after element is removed from DOM  | `CustomEvent<any>` |
| `deleting` | Raised before element is removed from DOM | `CustomEvent<any>` |
| `selected` | Raised after element receives focus       | `CustomEvent<any>` |


## Methods

### `delete() => Promise<boolean>`

Removes element from DOM

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
