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
  const select_class = 'fill-transparent stroke-blue-500 strike-1 pointer-events-none'
  const bounds_class = 'fill-white stroke-blue-500 strike-1'

  const soleLayerId = useSelf(me => me.presence.selection.length === 1 ? me.presence.selection[0] : null)
  const isShowingHandles = useStorage(root => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path)
  const bounds = useSelectionBounds()

  if (!bounds) return null

  const boundsList = [
    {
      cursor: 'nwse',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`
    },
    {
      cursor: 'ns',
      translate: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`
    },
    {
      cursor: 'nesw',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2}px)`
    },
    {
      cursor: 'ew',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`
    },
    {
      cursor: 'nwse',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`
    },
    {
      cursor: 'ns',
      translate: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`
    },
    {
      cursor: 'nesw',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`
    },
    {
      cursor: 'ew',
      translate: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px)`
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
            <rect
              className={bounds_class}
              style={{
                height: `${HANDLE_WIDTH}px`,
                width: `${HANDLE_WIDTH}px`,
                transform: elem.translate,
                cursor: `${elem.cursor}-resize`
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation()
                // TODO: add resize handler
              }}
            />
          ))}
        </>
      )}
    </>
  )
})

SelectionBox.displayName = 'SelectionBox'