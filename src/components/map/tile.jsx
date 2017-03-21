
import {GAME} from 'core/constants'

const COLORS = [
  'rgb(255, 0, 0)',
  'rgb(255, 230, 220)'
]

const getTileColor = type => {
  return (type >= 0 && type < COLORS.length)
    ? COLORS[type]
    : 'rgb(0, 0, 0)'
}

const Tile = ({type, pos}) => {
  const [x, y] = pos
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x * GAME.TILE_SIZE}px`,
        top: `${y * GAME.TILE_SIZE}px`,
        background: `${getTileColor(type)}`,
        width: `${GAME.TILE_SIZE}px`,
        height: `${GAME.TILE_SIZE}px`
      }}
      className='Tile'
    />
  )
}

export default Tile
