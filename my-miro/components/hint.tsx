import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface HintProps {
  label: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  sideOffcet?: number
  alignOffcet?: number
}

export const Hint = ({
  label,
  children,
  align,
  side,
  alignOffcet,
  sideOffcet
}: HintProps) => {
  const toolText_class = 'font-semibold capitalize'
  const toolContent_class = 'text-white bg-black border-black'
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={toolContent_class}
          side={side}
          align={align}
          sideOffset={sideOffcet}
          alignOffset={alignOffcet}
        >
          <p className={toolText_class}>
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}