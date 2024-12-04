import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react/suspense";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"]
})

const calculateFontSize = (width: number, height: number) => {
  const MAX_FONT_SIZE = 96
  const SCALE_FACTOR = .15

  const fontSizeBasedOnHeight = height * SCALE_FACTOR
  const fontSizeBasedOnWidth = width * SCALE_FACTOR

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, MAX_FONT_SIZE)
}

interface NoteProps {
  id: string
  layer: NoteLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor
}: NoteProps) => {
  const textBlock_class = 'h-full w-full flex items-center justify-center text-center outline-none'
  const noteBlock_class = 'shadow-md drop-shadow-xl'

  const { x, y, height, width, fill, value } = layer

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers")

    liveLayers.get(id)?.set('value', newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={e => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCss(fill) : '#000'
      }}
      className={noteBlock_class}
    >
      <ContentEditable
        html={value || 'Text'}
        onChange={handleContentChange}
        className={cn(textBlock_class, font.className)}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : '#000'
        }}
      />
    </foreignObject>
  )
}