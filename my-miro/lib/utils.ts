import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  '#dc2626',
  '#d97706',
  '#059669',
  '#7c3aed',
  '#db2777'
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}