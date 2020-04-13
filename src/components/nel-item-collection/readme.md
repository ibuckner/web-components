# nel-item-collection



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                             | Type                         | Default      |
| ----------- | ----------- | ----------------------------------------------------------------------- | ---------------------------- | ------------ |
| `align`     | `align`     | Aligns child elements within collection. Defaults to vertical list.     | `"horizontal" \| "vertical"` | `"vertical"` |
| `clear`     | `clear`     | Clears out all child elements from collection                           | `boolean`                    | `undefined`  |
| `disabled`  | `disabled`  | If false, element is partly greyed out and not responding to user input | `boolean`                    | `false`      |
| `ready`     | `ready`     | True when element can correctly respond to external programmatic access | `boolean`                    | `false`      |
| `resizable` | `resizable` | Displays the element resize handle (bottom right corner) if true        | `boolean`                    | `false`      |
| `sort`      | `sort`      | Sorts child elements in collection based on text content                | `"ASC" \| "DESC"`            | `"ASC"`      |


## Events

| Event     | Description                                                              | Type               |
| --------- | ------------------------------------------------------------------------ | ------------------ |
| `cleared` | Fired after child elements are removed via clear() method                | `CustomEvent<any>` |
| `loaded`  | Fired when element can correctly respond to external programmatic access | `CustomEvent<any>` |
| `sorted`  | Fired after child elements are sorted                                    | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
