import { useState } from 'react'

export function UseSecondSearch() {
  const [secondSearch, setSecondSearch] = useState(null)

  const handleSearchTrigger = (family) => {
    let relArray = family.relationships
    let nameArray = []

    family.relatives.forEach((relative) => {
      relArray = relArray.concat(relative.RELATED_TO_rel.from)
      relArray = relArray.concat(relative.RELATED_TO_rel.to)
    })

    relArray.forEach((relationship) => {
      nameArray = nameArray.concat(relationship.name)
    })

    setSecondSearch(nameArray)
  }

  return {
    secondSearch,
    handleSearchTrigger,
  }
}
