'use client'

import { useSelectionBounds } from "@/hooks/use-selection-bounds"
import { LayerType, Side, XYWH } from "@/types/canvas"
import { useSelf, useStorage } from "@liveblocks/react/suspense"
import { memo } from "react"

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {
  const select_class = 'fill-transparent stroke-orange-500 stroke-2 pointer-events-none'
  const bounds_class = 'fill-white stroke-orange-500 stroke-2'

  const soleLayerId = useSelf(me => me.presence.selection.length === 1 ? me.presence.selection[0] : null)
  const isShowingHandles = useStorage(root => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path)
  const bounds = useSelectionBounds()

  if (!bounds) return null

  const boundsList = [
    {
      key: 1,
      cursor: 'nwse',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
      corner: Side.Top + Side.Left,
    },
    {
      key: 2,
      cursor: 'ns',
      translate: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
      corner: Side.Top,
    },
    {
      key: 3,
      cursor: 'nesw',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
      corner: Side.Top + Side.Right,
    },
    {
      key: 4,
      cursor: 'ew',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
      corner: Side.Right,
    },
    {
      key: 5,
      cursor: 'nwse',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
      corner: Side.Right + Side.Bottom,
    },
    {
      key: 6,
      cursor: 'ns',
      translate: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
      corner: Side.Bottom,
    },
    {
      key: 7,
      cursor: 'nesw',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
      corner: Side.Left + Side.Bottom,
    },
    {
      key: 8,
      cursor: 'ew',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px)`,
      corner: Side.Left,
    },
  ]

  return (
    <>
      <rect
        className={select_class}
        style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          {boundsList.map(elem => (
            <ellipse
            rx={HANDLE_WIDTH / 2} 
            ry={HANDLE_WIDTH / 2} 
            cx={HANDLE_WIDTH / 2}
            cy={HANDLE_WIDTH / 2}
            key={elem.key}
              className={bounds_class}
              style={{
                transform: elem.translate,
                cursor: `${elem.cursor}-resize`
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown(elem.corner, bounds)
              }}
            />
          ))}
        </>
      )}
    </>
  )
})

SelectionBox.displayName = 'SelectionBox'