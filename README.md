# styletron-vue

[![NPM version](https://img.shields.io/npm/v/styletron-vue.svg?style=flat)](https://npmjs.com/package/styletron-vue) [![NPM downloads](https://img.shields.io/npm/dm/styletron-vue.svg?style=flat)](https://npmjs.com/package/styletron-vue) [![CircleCI](https://circleci.com/gh/egoist/styletron-vue/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/styletron-vue/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

> Vue bindings for [Styletron](https://github.com/rtsao/styletron).

## Install

```bash
yarn add styletron styletron-vue
```

CDN: [UNPKG](https://unpkg.com/styletron-vue/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/styletron-vue/dist/)

## Usage

Bind `styletron` instance to root Vue instance:

```js
import StyletronVue from 'styletron-vue'
import Styletron from 'styletron'
import MyApp from './MyApp.vue'

Vue.use(StyletronVue)

const styletron = new Styletron()

// You can set `styletron` instance in any parent component options
// Like in the root instance options
new Vue({
  styletron,
  render: h => h(MyApp)
})
```

Then use `styletron-vue`:

<details><summary>in single-file component</summary><br>

```vue
<template>
  <div>
    <styled-button>I am pink</styled-button>
  </div>
</template>

<script>
import { styled } from 'styletron-vue'

const StyledButton = styled('div', {
  color: 'pink'
})

export default {
  components: {
    StyledButton
  }
}
</script>
```
</details>

<details><summary>in component with render function</summary><br>

```js
import { styled } from 'styletron-vue'

const StyledButton = styled('div', {
  color: 'pink'
})

export default {
  render() {
    return <StyledButton>I am pink</StyledButton>
  }
}
```
</details>

### Access Props

```js
styled('div', props => ({
  color: props.dark ? '#000' : '#fff'
}))
```

### Styled Component

```js
const Button = styled('button', {
  color: 'red'
})

const PinkButton = styled(Button, {
  color: 'pink'
})
```

### Theming

Check out [discussion here](https://github.com/egoist/styletron-vue/issues/2).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**styletron-vue** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/styletron-vue/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
