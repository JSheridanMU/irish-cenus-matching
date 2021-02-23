import { useState } from 'react'

export function UseSecondSearch() {
  const [secondSearch, setSecondSearch] = useState(null)

  const expandRelLabels = (labels) => {
    const componets = []
    const output = []

    labels.forEach((label) => {
      componets.push(label.split('-'))
    })

    componets.forEach((set) => {
      const ageDiff = parseInt(set[2])
      for (let i = ageDiff - 5; i <= ageDiff + 5; i++) {
        const newAgeDiff = i.toString(10)
        output.push(set[0] + '-' + set[1] + '-' + newAgeDiff)
        output.push(set[1] + '-' + set[0] + '-' + newAgeDiff)
      }
    })

    return output
  }

  const handleSearchTrigger = (family) => {
    let relArray = family.relationships
    let relLabels = []
    let familyArray = [family]

    family.relatives.forEach((relative) => {
      relArray = relArray.concat(relative.RELATED_TO_rel.from)
      relArray = relArray.concat(relative.RELATED_TO_rel.to)
      familyArray.push(relative)
    })

    relArray.forEach((relationship) => {
      relLabels = relLabels.concat(relationship.name)
    })

    setSecondSearch({
      relationships: expandRelLabels(relLabels),
      family: familyArray,
    })
  }

  return {
    secondSearch,
    handleSearchTrigger,
  }
}
