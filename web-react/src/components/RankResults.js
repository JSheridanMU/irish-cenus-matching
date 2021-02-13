//import { useState } from 'react'

export function RankResults() {
  const pruneData = (input) => {
    let output = []
    let households = []

    input.Person.forEach((family) => {
      if (!households.includes(family.household)) {
        output.push(family)
        households.push(family.household)
      }
    })

    return output
  }

  const orderData = (data, relationships) => {
    if (data) {
      const prunedData = pruneData(data)
      const unorderedData = []

      prunedData.forEach((family) => {
        let relArray = []
        let nameArray = []

        relArray = relArray.concat(family.RELATED_TO_rel.from)
        relArray = relArray.concat(family.RELATED_TO_rel.to)

        family.related_to.forEach((relative) => {
          relArray = relArray.concat(relative.RELATED_TO_rel.from)
          relArray = relArray.concat(relative.RELATED_TO_rel.to)
        })
        family.related_from.forEach((relative) => {
          relArray = relArray.concat(relative.RELATED_TO_rel.from)
          relArray = relArray.concat(relative.RELATED_TO_rel.to)
        })

        relArray.forEach((relationship) => {
          nameArray = nameArray.concat(relationship.name)
        })

        console.log('Selection', relationships)
        console.log('Target', nameArray)

        const countObject = {
          count: relationships.reduce((a, c) => a + nameArray.includes(c), 0),
        }
        unorderedData.push(Object.assign(countObject, family))
      })
      const orderedData = unorderedData.sort((a, b) => a.count - b.count)

      return {
        Person: orderedData,
      }
    }
  }

  return {
    orderData,
  }
}
