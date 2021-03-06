
import {to2d} from 'core/utils'
import Tile from './tile'

const createChildren = data => {
  return data.map((d, i) => {
    return (
      <Tile
        key={`tile${i}`}
        type={d}
        pos={to2d(i)}
      />
    )
  })
}

const Map = ({data, children}) => {
  return (
    <div className='Map'>
      {createChildren(data)}
      {children}
      <style jsx>{`
        .Map {
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default Map
