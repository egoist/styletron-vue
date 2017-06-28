import Vue from 'vue'
import Styletron from 'styletron'
import { styled } from '../src'

const App = {
  name: 'app',
  render() {
    const Button = styled('button', {
      color: 'pink',
      fontSize: '20px',
      border: '1px solid #e2e2e2',
      background: 'white'
    })
    const RedButton = styled(Button, {
      color: 'red'
    })
    return (
      <div>
        <Button>hi</Button>
        <RedButton>there</RedButton>
      </div>
    )
  }
}

new Vue({
  el: '#app',
  styletron: new Styletron(),
  render: h => h(App)
})
