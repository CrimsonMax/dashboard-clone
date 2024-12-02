'use client'

import { useSelectionBounds } from "@/hooks/use-selection-bounds"
import { Camera, Color } from "@/types/canvas"
import { useMutation, useSelf } from "@liveblocks/react/suspense"
import { memo } from "react"
import { ColorPicker } from "./color-picker"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {
  const tools_class = 'absolute p-3 rounded-xl bg-white shadow-sm border flex select-none'
  const deleteBtn_class = 'flex items-center pl-2 ml-2 border-l'

  const selection = useSelf((me) => me.presence.selection)

  const setFill = useMutation(({ storage }, fill: Color) => {
    const liveLayers = storage.get("layers")
    setLastUsedColor(fill)

    selection.forEach(elem => {
      liveLayers.get(elem)?.set("fill", fill)
    })
  }, [selection, setLastUsedColor])

  const deleteLayers = useDeleteLayers()

  const selectionBounds = useSelectionBounds()

  if (!selectionBounds) return null

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
  const y = selectionBounds.y + camera.y

  return (
    <div className={tools_class} style={{ transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))` }}>
      <ColorPicker onChange={setFill} />
      <div className={deleteBtn_class}>
        <Hint label="Destroy!">
          <Button
            variant="board"
            size="icon"
            onClick={deleteLayers}
          >
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  )
})

SelectionTools.displayName = 'SelectionTools'