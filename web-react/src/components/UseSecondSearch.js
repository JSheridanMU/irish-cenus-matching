import { useState } from 'react'

export function UseSecondSearch() {
  const [secondSearch, setSecondSearch] = useState(false)

  const handleSearchTrigger = () => {
    setSecondSearch(!secondSearch.currnet)
    console.log(secondSearch)
  }

  return {
    secondSearch,
    setSecondSearch,
    handleSearchTrigger,
  }
}
