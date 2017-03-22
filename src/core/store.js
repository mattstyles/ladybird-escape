
import {Signal} from 'raid'
import {adaptor} from 'raid-addons'

import {generateMap} from 'core/utils'

export const signal = new Signal({
  player: {
    pos: [0, 0],
    isMoving: false
  },
  map: {
    data: generateMap()
  }
})

export const connect = adaptor(signal)

export const dispatch = type => payload =>
  signal.emit({
    type,
    payload
  })
