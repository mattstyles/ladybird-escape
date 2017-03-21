
import {GAME} from 'core/constants'

const REL_SIZE = 0.75
const SIZE = GAME.TILE_SIZE * REL_SIZE
const OFFSET = (GAME.TILE_SIZE * (1 - REL_SIZE)) * 0.5

const Player = ({pos}) => {
  const [x, y] = [
    (pos[0] * GAME.TILE_SIZE) + OFFSET,
    (pos[1] * GAME.TILE_SIZE) + OFFSET
  ]
  return (
    <div
      style={{
        position: 'absolute',
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: `transform ${GAME.MOVE_SPEED}ms linear`,
        background: 'rgb(64, 64, 64)',
        borderRadius: 200
      }}
    />
  )
}

export default Player
