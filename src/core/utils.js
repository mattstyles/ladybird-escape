
import {GAME} from 'core/constants'

export const to2d = coord => {
  return [
    coord % GAME.MAP_SIZE,
    coord / GAME.MAP_SIZE | 0
  ]
}

export const generateMap = () => {
  return new Array(GAME.MAP_SIZE * GAME.MAP_SIZE)
    .fill(1)
    .map(i => Math.random() < 0.5 ? 1 : 0)
}
