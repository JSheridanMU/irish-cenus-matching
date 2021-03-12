import React from 'react'
import { useQuery, gql } from '@apollo/client'
import ResultsTable from './ResultsTable'
import { RankResults } from './RankResults'

const GET_HOUSEHOLD = gql`
  query getHouseholds($year: String, $relationships: [String!]) {
    Person(
      filter: {
        household_contains: $year
        OR: [
          { RELATED_TO_rel_in: { from: { name_in: $relationships } } }
          { RELATED_TO_rel_in: { to: { name_in: $relationships } } }
        ]
      }
    ) {
      id: _id
      forename
      surname
      age
      sex
      relationToHead
      household
      birthplace
      occupation
      religion
      soundex
      related_to {
        id: _id
        forename
        surname
        age
        sex
        relationToHead
        birthplace
        occupation
        religion
        soundex
        RELATED_TO_rel {
          from {
            name
          }
          to {
            name
          }
        }
      }
      related_from {
        id: _id
        forename
        surname
        age
        sex
        relationToHead
        birthplace
        occupation
        religion
        soundex
        RELATED_TO_rel {
          from {
            name
          }
          to {
            name
          }
        }
      }
      RELATED_TO_rel {
        from {
          name
        }
        to {
          name
        }
      }
    }
  }
`
const { orderData } = RankResults()

export default function SearchResults(props) {
  const { loading, data, error } = useQuery(GET_HOUSEHOLD, {
    variables: {
      year: props.values.year === '1911' ? '/1901/' : '/1911/',
      relationships: props.relationships,
    },
  })

  return (
    <ResultsTable
      data={orderData(data, props.relationships, props.family)}
      loading={loading}
      error={error}
      secondSearch={true}
      query={props.family}
    />
  )
}
