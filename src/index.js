
import {render} from 'react-dom'
import {safe} from 'raid-addons'

import el from 'core/element'
import {signal} from 'core/store'
import {update} from 'core/keys'

import Map from 'components/map'
import Player from 'components/player'

const App = ({state}) => {
  const [x, y] = state.player.pos
  return (
    <div>
      <span>{`${x}:${y}`}</span>
      <Map {...state.map}>
        <Player {...state.player} />
      </Map>
    </div>
  )
}

// Debug state
// signal.register(safe(state => {
//   if (process.env.DEBUG) {
//     console.log(state)
//   }
// }))

// Keys
signal.register(update)

signal.observe(
  state => render(<App state={state} />, el),
  err => console.error(err)
)
