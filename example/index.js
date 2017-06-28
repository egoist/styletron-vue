import Vue from 'vue'
import Styletron from 'styletron'
import GitHub from 'vue-github-badge'
import { styled } from '../src'

const App = {
  name: 'app',
  data() {
    return {
      fontSize: 12
    }
  },
  methods: {
    handleFontSize(e) {
      this.fontSize = e.target.value
    }
  },
  render() {
    const Button = styled('button', props => ({
      color: 'pink',
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
      </div>
    )
  }
}

new Vue({
  el: '#app',
  styletron: new Styletron(),
  render: h => h(App)
})
