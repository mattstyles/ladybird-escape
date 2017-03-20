
import {Signal} from 'raid'
import {adaptor} from 'raid-addons'

export const signal = new Signal({
  player: {
    pos: [0, 0]
  },
  test: 'junk'
})

export const connect = adaptor(signal)
