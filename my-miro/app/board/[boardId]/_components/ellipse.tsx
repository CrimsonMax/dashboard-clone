import { colorToCss } from "@/lib/utils"
import { EllipseLayer } from "@/types/canvas"

interface EllipseProps {
  id: string
  layer: EllipseLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor
}: EllipseProps) => {
  const round_class = 'drop-shadow-md'

  const { x, y, height, width, fill } = layer

  return (
    <ellipse
      className={round_class}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      strokeWidth='1'
      fill={fill ? colorToCss(fill) : '#000'}
      stroke={selectionColor || "transparent"}
    />
  )
}