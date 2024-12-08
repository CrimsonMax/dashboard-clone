import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"

interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (newState: CanvasState) => void
  unselect: () => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  unselect,
  canUndo,
  canRedo
}: ToolbarProps) => {
  const toolbarMain_class = 'absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'
  const toolbarInner_class = 'bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'
  const toolbarHistory_class = 'bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'

  const selectTool = (mode: number, layerType?: number) => {
    unselect()

    mode === CanvasMode.None || mode === CanvasMode.Pencil ? setCanvasState({ mode }) : setCanvasState({ mode, layerType })
  }

  return (
    <div className={toolbarMain_class}>
      <div className={toolbarInner_class}>
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => selectTool(CanvasMode.None)}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => selectTool(CanvasMode.Pencil)}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => selectTool(CanvasMode.Inserting, LayerType.Text)}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text}
        />
        <ToolButton
          label="Sticker"
          icon={StickyNote}
          onClick={() => selectTool(CanvasMode.Inserting, LayerType.Note)}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => selectTool(CanvasMode.Inserting, LayerType.Rectangle)}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => selectTool(CanvasMode.Inserting, LayerType.Ellipse)}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse}
        />
      </div>
      <div className={toolbarHistory_class}>
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
  const toolbarMain_class = 'absolute top-[50%] -translate-y-[50%] left-2 flex flex-col bg-white gap-y-4 h-[360px] w-[52px] shadow-md rounded-md'

  return (
    <div className={toolbarMain_class} />
  )
}