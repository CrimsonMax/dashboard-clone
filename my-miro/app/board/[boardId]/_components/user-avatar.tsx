import { Hint } from "@/components/hint"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string
  name?: string
  fallback?: string
  borderColor?: string
}

export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor
}: UserAvatarProps) => {
  const avatar_class = 'h-8 w-8 border-2'
  const avatarFallback_class = 'text-xs font-semibold'

  return (
    <Hint label={name || 'Anon'} side="bottom" sideOffcet={18}>
      <Avatar className={avatar_class} style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className={avatarFallback_class}>
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  )
}