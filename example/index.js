import Vue from 'vue'
import Styletron from 'styletron'
import GitHub from 'vue-github-badge'
import { styled } from '../src'

const Button = styled('button', (props, ctx) => ({
  color: ctx.injections.theme === 'green' ? 'green' : 'pink',
  fontSize: `${props.fontSize}px`,
  border: '1px solid #e2e2e2',
  background: 'white',
  marginRight: '10px',
  padding: '10px 20px'
}))

const RedButton = styled(Button, {
  color: 'red',
  ':hover': {
    color: 'white',
    background: 'red'
  }
})

const App = {
  name: 'app',
  data() {
    return {
      fontSize: 12
    }
  },
  provide: {
    theme: 'green'
  },
  methods: {
    handleFontSize(e) {
      this.fontSize = e.target.value
    }
  },
  render() {
    return (
      <div>
        <GitHub slug="egoist/styletron-vue" />
        <label>
          Font Size:{' '}
          <input
            value={this.fontSize}
            type="number"
            onInput={this.handleFontSize}
          />
        </label>
        <p>
          <Button fontSize={this.fontSize}>hi</Button>
          <RedButton fontSize={this.fontSize}>move mouse over here</RedButton>
        </p>
        <p>
          Check out the{' '}
          <a href="https://github.com/egoist/styletron-vue/blob/master/example/index.js">
            source code
          </a>{' '}
          of the example.
        </p>
      </div>
    )
  }
}

new Vue({
  el: '#app',
  styletron: new Styletron(),
  render: h => h(App)
})
