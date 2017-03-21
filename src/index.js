
import {render} from 'react-dom'
import {safe} from 'raid-addons'

import el from 'core/element'
import {signal} from 'core/store'

import Map from 'components/map/map'

const App = ({state}) => {
  const [x, y] = state.player.pos
  return (
    <div>
      <span>{`${x}:${y}`}</span>
      <Map {...state.map} />
    </div>
  )
}

// Debug state
signal.register(safe(state => {
  if (process.env.DEBUG) {
    console.log('state')
  }
}))

signal.observe(
  state => render(<App state={state} />, el),
  err => console.error(err)
)
