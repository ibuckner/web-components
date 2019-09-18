# nel-item-collection



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                    | Type                         | Default      |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `align`     | `align`     | Aligns child elements within collection. Defaults to vertical list.                            | `"horizontal" \| "vertical"` | `"vertical"` |
| `disabled`  | `disabled`  | If false, element is partly greyed out and not responding to user input                        | `boolean`                    | `false`      |
| `resizable` | `resizable` | Displays the element resize handle (bottom right corner) if true                               | `boolean`                    | `false`      |
| `sortable`  | `sortable`  | New elements added to the collection will cause all child elements to be sorted alphabetically | `boolean`                    | `false`      |


## Events

| Event    | Description                                                | Type               |
| -------- | ---------------------------------------------------------- | ------------------ |
| `erased` | Raised after child elements are removed via clear() method | `CustomEvent<any>` |
| `sorted` | Raised after child elements are sorted                     | `CustomEvent<any>` |


## Methods

### `clear() => Promise<boolean>`

Clears out all child elements from collection

#### Returns

Type: `Promise<boolean>`



### `sort(reverse?: boolean) => Promise<boolean>`

Sorts child elements in collection based on text content

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
