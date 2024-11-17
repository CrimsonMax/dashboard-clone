'use client'

import { LayerType } from "@/types/canvas"
import { useStorage } from "@liveblocks/react/suspense"
import { memo } from "react"
import { Rectangle } from "./rectangle"

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: () => void // TODO: add types
  selectionColor?: string
}

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor
}: LayerPreviewProps) => {
  const layer = useStorage(root => root.layers.get(id))

  console.log(layer)

  if (!layer) return

  switch (layer.type) {
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