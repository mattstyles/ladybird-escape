
import {compress, arc, safe} from 'raid-addons'
import keystream, {actions as keyActions} from 'raid-streams/keys'
import {compose} from 'lodash/fp'

import {actions, GAME} from 'core/constants'
import {signal} from 'core/store'
import {add2d, clamp2d, to1d, delay} from 'core/utils'

signal.mount(keystream())
const ion = arc(signal)

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

const onKeydown = ion(async (getState, payload, signal) => {
  let state = getState()
  if (state.player.isMoving) {
    return
  }

  const {key} = payload

  let newPos = newPosition(state.player.pos, key)
  if (!state.map.data[to1d(newPos)]) {
    return
  }

  signal.emit({
    type: actions.moveStart,
    payload: {
      newPos,
      key
    }
  })
  await delay(GAME.MOVE_SPEED)
  signal.emit({type: actions.moveComplete})
})

const onMoveStart = safe((state, payload) => {
  const {key, newPos} = payload
  state.player.isMoving = true
  state.player.dir = key
  state.player.pos = newPos
})

const onMoveComplete = safe((state, payload) => {
  state.player.isMoving = false
})

export const update = compress({
  [keyActions.keydown]: onKeydown,
  [actions.moveStart]: onMoveStart,
  [actions.moveComplete]: onMoveComplete
})
