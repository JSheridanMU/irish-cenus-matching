import { MatchPerson } from './MatchPerson'

const RELATIONSHIP_VALUE = 6
const MATCHING_THRESHOLD = 5.1
const { match } = MatchPerson()

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

const matchRelationships = (data, relationships) => {
  const unorderedData = []

  data.forEach((family) => {
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

    const countObject = {
      points:
        relationships.reduce((a, c) => a + nameArray.includes(c), 0) *
        RELATIONSHIP_VALUE,
    }
    unorderedData.push(Object.assign(countObject, family))
  })
  return unorderedData
}

const orderData = (data, relationships, family) => {
  if (data) {
    data = pruneData(data)
    const unorderedData = matchRelationships(data, relationships)

    unorderedData.forEach((target) => {
      let bestMatch = 0
      family.forEach((queryPerson) => {
        let matchScore = match(target, queryPerson)
        if (matchScore > bestMatch && matchScore > MATCHING_THRESHOLD) {
          bestMatch = matchScore
        }
      })
      target.points += bestMatch
      target.related_from.forEach((relation) => {
        bestMatch = 0
        family.forEach((queryPerson) => {
          let matchScore = match(relation, queryPerson)
          if (matchScore > bestMatch && matchScore > MATCHING_THRESHOLD) {
            bestMatch = matchScore
          }
        })
        target.points += bestMatch
      })
      target.related_to.forEach((relation) => {
        bestMatch = 0
        family.forEach((queryPerson) => {
          let matchScore = match(relation, queryPerson)
          if (matchScore > bestMatch && matchScore > MATCHING_THRESHOLD) {
            bestMatch = matchScore
          }
        })
        target.points += bestMatch
      })
    })

    const orderedData = matchRelationships(unorderedData, relationships).sort(
      (a, b) => a.points - b.points
    )

    return {
      Person: orderedData.reverse(),
    }
  }
}

export function RankResults() {
  return {
    orderData,
  }
}
