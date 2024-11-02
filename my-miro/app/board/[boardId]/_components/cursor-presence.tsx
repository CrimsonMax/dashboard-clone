'use client'

import { useOthersConnectionIds } from "@liveblocks/react/suspense"
import { memo } from "react"
import { Cursor } from "./cursor"

const Cursors = () => {
  const ids = useOthersConnectionIds()

  return (
    <>
      {
        ids.map(elem => (
          <Cursor key={elem} connectionId={elem} />
        ))
      }
    </>
  )
}

export const CursorPresence = memo(() => {
  return (
    <>
      {/* Draw pencils */}
      <Cursors />
    </>
  )
})