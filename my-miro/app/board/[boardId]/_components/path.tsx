import { getSvgPathFromStroke } from "@/lib/utils"
import getStroke from 'perfect-freehand'

interface PathProps {
  x: number,
  y: number,
  fill: string,
  points: number[][],
  onPointerDown?: (e: React.PointerEvent) => void,
  stroke?: string
}

export const Path = ({ x, y, fill, points, stroke, onPointerDown }: PathProps) => {
  const path_class = 'drop-shadow-md'
  
  return (
    <path 
      className={path_class}
      onPointerDown={onPointerDown}
      d={
        getSvgPathFromStroke(
          getStroke(
            points,
            {
              size: 14,
              thinning: .5,
              smoothing: .5,
              streamline: .5
            }
          )
        )
      }
      style={{transform: `translate(${x}px, ${y}px)`}}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  )
}