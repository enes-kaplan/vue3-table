# Introduction
This is a test project that I made to practice and better understand Vue 3. I haven't seen a thorough table component for Vue 3 this may fill in that gap for future uses. It may go open source with it after it matures enough for public usage.

<br>
<br>



## Installation
---
Install the package

```shell
npm install --save vue-my-table-3
```

Import and globally register the component in your entry file (main.js).

```javascript
import { createApp } from 'vue'
import VueMyTable3 from 'vue-my-table-3'

createApp(App)
	.use(VueMyTable3)
	.mount('#app')
```

Then you can use it in your Vue components as:

```html
<vue-table></vue-table>

```

## Properties
---

### columns
Required: true

| Property    | Description                                 | Required?   | Default     | Values          |
| ----------- | -----------                                 | ----------- | ----------- | ----------      |
| name        | Name of the column to use from the data set | true        | `-`         | `-`             |
| text        | Header text to appear on the table          | true        | `-`         | `-`             |
| align       | Text alignment for data rows                | false       | `'center'`    | `'left'` `'right'` |
