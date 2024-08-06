'use client'

import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import React from "react"

interface FooterProps {
  title: string
  authorLabel: string | undefined
  createdAtLabel: string
  isFavorite: boolean
  onClick: () => void
  disabled: boolean
}

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const footerContainer_class = 'relative bg-white p-3'
  const footerTitle_class = 'text-[13px] truncate max-w-[calc(100%-20px)]'
  const footerInfo_class = 'opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'
  const footerBtn1_class = 'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-orange-600'
  const footerBtn2_class = 'cursor-not-allowed opacity-75'
  const footerStar1_class = 'h-4 w-4'
  const footerStar2_class = 'fill-orange-600 text-orange-600'

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    event.preventDefault()

    onClick()
  }

  return (
    <div className={footerContainer_class}>
      <p className={footerTitle_class}>
        {title}
      </p>
      <p className={footerInfo_class}>
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(footerBtn1_class, disabled && footerBtn2_class)}
      >
        <Star
          className={cn(footerStar1_class, isFavorite && footerStar2_class)}
        />
      </button>
    </div>
  )
}