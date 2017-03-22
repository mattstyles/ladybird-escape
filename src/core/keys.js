
import Quay from 'quay'
import {compress} from 'raid-addons'
import {compose} from 'lodash/fp'

import {actions, GAME} from 'core/constants'
import {dispatch} from 'core/store'
import {add2d, clamp2d, to1d} from 'core/utils'

/**
 * There should be a delay between keydown emitting, this is
 * currently handled in the update but should probably be held in
 * the stream. Use most to handle the quay events and time them,
 * then emit only the latest from the stream.
 */

const dispatchKeyDown = dispatch(actions.keydown)
const dispatchMoveComplete = dispatch(actions.moveComplete)

const onKeydown = key => event =>
  dispatchKeyDown({
    event,
    key
  })

const clampMap = clamp2d([0, GAME.MAP_SIZE - 1])

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

const newPosition = (pos, key) => {
  if (!moveMap[key]) {
    return pos
  }

  return moveMap[key](pos)
}

const quay = new Quay()
quay.on('<up>', onKeydown('<up>'))
quay.on('<down>', onKeydown('<down>'))
quay.on('<left>', onKeydown('<left>'))
quay.on('<right>', onKeydown('<right>'))

export const update = compress({
  [actions.keydown]: (state, payload) => {
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
