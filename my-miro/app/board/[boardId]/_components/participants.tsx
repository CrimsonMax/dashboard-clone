export const Participants = () => {
  const participantsMain_class = 'absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'

  return (
    <div className={participantsMain_class}>
      Users
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  const participantsMain_class = 'absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]'

  return (
    <div className={participantsMain_class} />
  )
}