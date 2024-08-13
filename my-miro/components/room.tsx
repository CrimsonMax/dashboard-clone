'use client'

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
  children: ReactNode
  roomId: string
  fallback: NonNullable<ReactNode> | null
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_4BKQsWL3lpYi15BJIzgg197ZxRr22EbqHtLO_beSzTy6TqdxdkFYCCsvNteYUI1d"}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}