import Vue from 'vue'
import Styletron from 'styletron'
import GitHub from 'vue-github-badge'
import Styled, { styled } from '../src'

Vue.use(Styled)

const Button = styled('button', (props, ctx) => ({
  color: ctx.injections.theme === 'green' ? 'green' : 'pink',
  fontSize: `${props.fontSize}px`,
  border: '1px solid #e2e2e2',
  background: 'white',
  marginRight: '10px',
  padding: '10px 20px'
}), ['fontSize'])

const RedButton = styled(Button, {
  color: 'red',
  ':hover': {
    color: 'white',
    background: 'red'
  }
})

const StyledAnchor = styled('a', {
  color: 'pink'
})

const App = {
  name: 'app',
  data() {
    return {
      fontSize: 12
    }
  },
  styletron: new Styletron(),
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
          <Button onClick={() => alert('123')} fontSize={this.fontSize}>hi</Button>
          <RedButton fontSize={this.fontSize}>move mouse over here</RedButton>
        </p>
        <p>
          Check out the{' '}
          <StyledAnchor href="https://github.com/egoist/styletron-vue/blob/master/example/index.js">
            source code
          </StyledAnchor>{' '}
          of the example.
        </p>
      </div>
    )
  }
}

new Vue({
  el: '#app',
  render: h => h(App)
})
