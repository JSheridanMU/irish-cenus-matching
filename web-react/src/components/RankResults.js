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
      points: relationships.reduce((a, c) => a + nameArray.includes(c), 0),
    }
    unorderedData.push(Object.assign(countObject, family))
  })
  return unorderedData
}

const diff = (a, b) => {
  const differnece = a > b ? a - b : b - a
  return differnece <= 10 ? true : false
}

const matchAge = (target, query) => {
  let points = 0

  query.forEach((person) => {
    if (person.soundex === target.soundex && diff(person.age, target.age)) {
      points += 1
    } else {
      target.related_from.forEach((relation) => {
        if (
          person.soundex === relation.soundex &&
          diff(person.age, relation.age)
        ) {
          points += 1
        }
      })
      target.related_to.forEach((relation) => {
        if (
          person.soundex === relation.soundex &&
          diff(person.age, relation.age)
        ) {
          console.log(diff(relation.age, target.age))
          points += 1
        }
      })
    }
  })

  return points
}

const matchString = (target, query, value) => {
  const stringSimilarity = require('string-similarity')
  let points = 0

  query.forEach((person) => {
    if (person.soundex === target.soundex) {
      points += stringSimilarity.compareTwoStrings(person[value], target[value])
    } else {
      target.related_from.forEach((relation) => {
        if (person.soundex === relation.soundex) {
          points += stringSimilarity.compareTwoStrings(
            relation[value],
            target[value]
          )
        }
      })
      target.related_to.forEach((relation) => {
        if (person.soundex === relation.soundex) {
          points += stringSimilarity.compareTwoStrings(
            relation[value],
            target[value]
          )
        }
      })
    }
  })
  return points
}

const orderData = (data, relationships, family) => {
  if (data) {
    data = pruneData(data)
    const unorderedData = matchRelationships(data, relationships)

    unorderedData.forEach((target) => {
      target.points += matchString(target, family, 'religion')
      target.points += matchString(target, family, 'birthplace') * 2
      target.points += matchString(target, family, 'occupation')
      target.points += matchAge(target, family) * 2
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
