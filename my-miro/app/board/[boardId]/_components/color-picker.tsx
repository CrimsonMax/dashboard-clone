'use client'

import { colorToCss } from "@/lib/utils"
import { Color } from "@/types/canvas"

interface ColorPickerProps {
  onChange: (color: Color) => void
}

interface ColorButtonProps {
  onCLick: (color: Color) => void
  color: Color
}

const ColorButton = ({ color, onCLick }: ColorButtonProps) => {
  const btn_class = 'w-8 h-8 items-center flex justify-center hover:opacity-75 transition'
  const innerBtn_class = 'w-8 h-8 rounded-md border border-neutral-300'

  return (
    <button className={btn_class} onClick={() => onCLick(color)}>
      <div className={innerBtn_class} style={{ background: colorToCss(color) }}></div>
    </button>
  )
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  const picker_class = 'flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200'

  return (
    <div className={picker_class}>
      <ColorButton onCLick={onChange} color={{ r: 243, g: 82, b: 35 }} />

      <ColorButton onCLick={onChange} color={{ r: 255, g: 249, b: 177 }} />
      <ColorButton onCLick={onChange} color={{ r: 68, g: 202, b: 99 }} />
      <ColorButton onCLick={onChange} color={{ r: 39, g: 142, b: 237 }} />
      <ColorButton onCLick={onChange} color={{ r: 155, g: 105, b: 245 }} />
      <ColorButton onCLick={onChange} color={{ r: 252, g: 142, b: 42 }} />
      <ColorButton onCLick={onChange} color={{ r: 0, g: 0, b: 0 }} />
      <ColorButton onCLick={onChange} color={{ r: 255, g: 255, b: 255 }} />
    </div>
  )
}