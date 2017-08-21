
import {GAME} from 'core/constants'

export const to2d = value => {
  return [
    value % GAME.MAP_SIZE,
    value / GAME.MAP_SIZE | 0
  ]
}

export const to1d = coord => {
  return (coord[1] * GAME.MAP_SIZE) + coord[0]
}

export const generateMap = () => {
  return new Array(GAME.MAP_SIZE * GAME.MAP_SIZE)
    .fill(1)
    .map(i => Math.random() < 0.5 ? 1 : 0)
}

// 2d array add
export const add2d = p1 => p2 =>
  [p1[0] + p2[0], p1[1] + p2[1]]

// 2d array subtract
export const subtract2d = p1 => p2 =>
  [p1[0] - p2[0], p1[1] - p2[1]]

export const clamp = (min, max) => value =>
  value < min
    ? min
    : value > max
      ? max
      : value

export const clampMap = clamp(0, GAME.MAP_SIZE)

export const clamp2d = p1 => {
  let mapClamp = clamp(p1[0], p1[1])
  return p2 => [mapClamp(p2[0]), mapClamp(p2[1])]
}

export const delay = ms => ({
  then: cb => setTimeout(cb, ms)
})
