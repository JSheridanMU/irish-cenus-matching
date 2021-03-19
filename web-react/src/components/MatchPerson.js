export function MatchPerson() {
  const diff = (a, b) => {
    const differnece = a > b ? a - b : b - a
    return differnece <= 10 ? true : false
  }

  const matchAge = (a, b) => {
    if (diff(a.age, b.age)) {
      return 1
    } else {
      return 0
    }
  }

  const matchString = (a, b, value) => {
    const stringSimilarity = require('string-similarity')
    return stringSimilarity.compareTwoStrings(a[value], b[value])
  }

  const matchOccupation = (a, b) => {
    if (
      a.occupation.match(/^(Scholar|UNKNOWN)$/) ||
      b.occupation.match(/^(Scholar|UNKNOWN)$/)
    ) {
      return 1
    } else {
      if (a.hisco && b.hisco) {
        if (a.hisco === b.hisco) {
          return 1
        } else {
          return 0
        }
      } else {
        return matchString(a, b, 'occupation')
      }
    }
  }

  const match = (a, b) => {
    let output = 0
    output += matchAge(a, b)
    output += matchString(a, b, 'religion')
    output += matchString(a, b, 'birthplace')
    output += matchOccupation(a, b, 'occupation')
    output += matchString(a, b, 'soundex') * 2
    return output
  }

  return {
    match,
  }
}
