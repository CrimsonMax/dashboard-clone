'use client'

import { nanoid } from "nanoid"
import { useCallback, useState } from "react"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@liveblocks/react/suspense"
import { CursorPresence } from "./cursor-presence"
import { pointerEventToCanvasPoint } from "@/lib/utils"
import { LiveObject } from "@liveblocks/client"
import { LayerPreview } from "./layer-preview"

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

export const Canvas = ({
  boardId
}: CanvasProps) => {
  const mainCanvas_class = 'h-full w-full relative bg-neutral-100 touch-none'
  const svg_class = 'h-[100vh] w-[100vw]'

  const layerIds = useStorage(root => root.layersIds)

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 0, g: 0, b: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
    position: Point,
  ) => {
    const liveLayers = storage.get('layers')

    if (liveLayers.size >= MAX_LAYERS) return

    const DEFAULT_HEIGHT = 100
    const DEFAULT_WIDTH = 100

    const liveLayersIds = storage.get('layersIds')
    const layerId = nanoid()
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH,
      fill: lastUsedColor,
    })

    liveLayersIds.push(layerId)
    liveLayers.set(layerId, layer)

    setMyPresence({ selection: [layerId] }, { addToHistory: true })
    setCanvasState({ mode: CanvasMode.None })
  }, [lastUsedColor])

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera(camera => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault()

    const current = pointerEventToCanvasPoint(e, camera)

    setMyPresence({ cursor: current })
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerUp = useMutation((
    { },
    e
  ) => {
    const point = pointerEventToCanvasPoint(e, camera)

    if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point)
    } else {
      setCanvasState({
        mode: CanvasMode.None
      })
    }

    history.resume()
  }, [
    camera,
    canvasState,
    history,
    insertLayer
  ])

  return (
    <main className={mainCanvas_class}>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className={svg_class}
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map(elem => (
            <LayerPreview
              key={elem}
              id={elem}
              onLayerPointerDown={() => { }}
              selectionColor='#000'
            />
          ))}
          <CursorPresence />
        </g>
      </svg>
    </main>
  )
}