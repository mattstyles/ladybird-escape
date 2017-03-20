
import {render} from 'react-dom'
import {safe} from 'raid-addons'

import el from './element'
import {signal} from './store'

const App = ({state}) => {
  const [x, y] = state.player.pos
  return (
    <div>
      <span>{`${x}:${y}`}</span>
    </div>
  )
}

signal.register(safe(state => console.log('state')))

signal.observe(
  state => render(<App state={state} />, el),
  err => console.error(err)
)
