'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"

export const SearchInput = () => {
  const searchWrapper_class = 'w-full relative'
  const searchContainer_class = 'absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4'
  const inputContainer_class = 'w-full max-w-[516px] pl-9'

  const router = useRouter()
  const [value, setValue] = useState('')
  const deboucedValue: any = useDebounceValue(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: '/',
      query: {
        search: deboucedValue[0]
      },
    }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }, [deboucedValue, router])

  return (
    <div className={searchWrapper_class}>
      <Search className={searchContainer_class} />
      <Input
        className={inputContainer_class}
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}