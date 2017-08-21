
import {compress} from 'raid-addons'
import keystream, {actions as keyActions} from 'raid-streams/keys'
import {compose} from 'lodash/fp'

import {actions, GAME} from 'core/constants'
import {signal, dispatch} from 'core/store'
import {add2d, clamp2d, to1d} from 'core/utils'

signal.mount(keystream())

const dispatchMoveComplete = dispatch(actions.moveComplete)
const clampMap = clamp2d([0, GAME.MAP_SIZE - 1])
const newPosition = (pos, key) => moveMap[key]
  ? moveMap[key](pos)
  : pos

const moveMap = {
  '<up>': compose(
    clampMap,
    add2d([0, -1])
  ),
  '<down>': compose(
    clampMap,
    add2d([0, 1])
  ),
  '<left>': compose(
    clampMap,
    add2d([-1, 0])
  ),
  '<right>': compose(
    clampMap,
    add2d([1, 0])
  )
}

export const update = compress({
  [keyActions.keydown]: (state, payload) => {
    if (state.player.isMoving) {
      return state
    }

    const {key} = payload

    state.player.isMoving = true
    state.player.dir = key

    let newPos = newPosition(state.player.pos, key)
    if (state.map.data[to1d(newPos)]) {
      state.player.pos = newPos
    }

    setTimeout(dispatchMoveComplete, GAME.MOVE_SPEED)
    return state
  },
  [actions.moveComplete]: (state, payload) => {
    state.player.isMoving = false
    return state
  }
})
