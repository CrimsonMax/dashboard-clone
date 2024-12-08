'use client'

import { LayerType } from "@/types/canvas"
import { useStorage } from "@liveblocks/react/suspense"
import { memo } from "react"
import { Rectangle } from "./rectangle"
import { Ellipse } from "./ellipse"
import { Text } from "./text"
import { Note } from "./note"
import { Path } from "./path"
import { colorToCss } from "@/lib/utils"

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor
}: LayerPreviewProps) => {
  const layer = useStorage(root => root.layers.get(id))

  if (!layer) return

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          x={layer.x}
          y={layer.y}
          points={layer.points}
          fill={layer.fill ? colorToCss(layer.fill) : '#000'}
          onPointerDown={e => onLayerPointerDown(e, id)}
          stroke={selectionColor}
        />
      )
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )

    default:
      return null
  }
})

LayerPreview.displayName = 'LayerPreview'