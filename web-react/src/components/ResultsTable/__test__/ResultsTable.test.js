import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import ResultsTable from '.././ResultsTable'

afterEach(cleanup)

const firstProps = {
  data: {
    Person: [
      {
        __typename: 'Person',
        id: '69701',
        forename: 'James',
        surname: 'Sheridan',
        age: 1881,
        sex: 'M',
        relationToHead: 'Nephew',
        household:
          'http://www.census.nationalarchives.ie/pages/1911/Kildare/Leixlip/Leixlip_Town/540364/',
        birthplace: 'Co Kildare',
        occupation: 'Postman',
        religion: 'Roman Catholic',
        soundex: 'J520S635',
        hisco: null,
        related_to: [
          {
            __typename: 'Person',
            id: '59687',
            forename: 'Catherine',
            surname: 'Sheridan',
            age: 1847,
            sex: 'F',
            relationToHead: 'Wife',
            birthplace: 'Co Kildare',
            occupation: 'UNKNOWN',
            religion: 'Roman Catholic',
            soundex: 'K365S635',
            hisco: null,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J520S635-K365S635-34',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-K365S635-0',
                },
              ],
              to: [],
            },
          },
        ],
        related_from: [
          {
            __typename: 'Person',
            id: '79799',
            forename: 'John',
            surname: 'Sheridan',
            age: 1847,
            sex: 'M',
            relationToHead: 'Head of Family',
            birthplace: 'Co Kildare',
            occupation: 'Master Bootmaker',
            religion: 'Roman Catholic',
            soundex: 'J500S635',
            hisco: null,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [],
              to: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-K365S635-0',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-J520S635-34',
                },
              ],
            },
          },
        ],
        RELATED_TO_rel: {
          __typename: '_PersonRELATED_TO_relDirections',
          from: [
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'J500S635-J520S635-34',
            },
          ],
          to: [
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'J520S635-K365S635-34',
            },
          ],
        },
      },
      {
        __typename: 'Person',
        id: '84251',
        forename: 'James',
        surname: 'Sheridan',
        age: 1885,
        sex: 'M',
        relationToHead: 'Son',
        household:
          'http://www.census.nationalarchives.ie/pages/1911/Kildare/Naas_Urban/New_Row/545683/',
        birthplace: 'Co Kildare',
        occupation: 'Groom',
        religion: 'Roman Catholic',
        soundex: 'J520S635',
        hisco: 62490,
        related_to: [
          {
            __typename: 'Person',
            id: '84252',
            forename: 'Patrick',
            surname: 'Sheridan',
            age: 1886,
            sex: 'M',
            relationToHead: 'Son',
            birthplace: 'Co Kildare',
            occupation: 'Labourer',
            religion: 'Roman Catholic',
            soundex: 'P362S635',
            hisco: 99910,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J520S635-P362S635-1',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-P362S635-24',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-P362S635-3',
                },
              ],
              to: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'P362S635-M650S635-13',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'P362S635-J500S635-10',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'P362S635-B632S635-25',
                },
              ],
            },
          },
          {
            __typename: 'Person',
            id: '74488',
            forename: 'Maryann',
            surname: 'Sheridan',
            age: 1899,
            sex: 'F',
            relationToHead: 'Daughter',
            birthplace: 'Co Kildare',
            occupation: 'Scolar',
            religion: 'Roman Catholic',
            soundex: 'M650S635',
            hisco: null,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'P362S635-M650S635-13',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J520S635-M650S635-14',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-M650S635-10',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-M650S635-11',
                },
              ],
              to: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M650S635-B632S635-38',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M650S635-J500S635-3',
                },
              ],
            },
          },
          {
            __typename: 'Person',
            id: '67895',
            forename: 'Bridget',
            surname: 'Sheridan',
            age: 1861,
            sex: 'F',
            relationToHead: 'Head of Family',
            birthplace: 'Co Kildare',
            occupation: 'UNKNOWN',
            religion: 'Roman Catholic',
            soundex: 'B632S635',
            hisco: null,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-B632S635-35',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M650S635-B632S635-38',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-B632S635-28',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-B632S635-49',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'P362S635-B632S635-25',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J520S635-B632S635-24',
                },
              ],
              to: [],
            },
          },
          {
            __typename: 'Person',
            id: '67896',
            forename: 'John',
            surname: 'Sheridan',
            age: 1896,
            sex: 'M',
            relationToHead: 'Son',
            birthplace: 'Co Kildare',
            occupation: 'Groom',
            religion: 'Roman Catholic',
            soundex: 'J500S635',
            hisco: 62490,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'P362S635-J500S635-10',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M650S635-J500S635-3',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-J500S635-14',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-J500S635-7',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J520S635-J500S635-11',
                },
              ],
              to: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-B632S635-35',
                },
              ],
            },
          },
        ],
        related_from: [
          {
            __typename: 'Person',
            id: '95219',
            forename: 'Mary Bridget',
            surname: 'Sheridan',
            age: 1910,
            sex: 'F',
            relationToHead: 'Daughter',
            birthplace: 'Co Kildare',
            occupation: 'UNKNOWN',
            religion: 'Roman Catholic',
            soundex: 'M616S635',
            hisco: null,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-M616S635-21',
                },
              ],
              to: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-P362S635-24',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-J520S635-25',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-M650S635-11',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-B632S635-49',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'M616S635-J500S635-14',
                },
              ],
            },
          },
          {
            __typename: 'Person',
            id: '95218',
            forename: 'Jane',
            surname: 'Sheridan',
            age: 1889,
            sex: 'F',
            relationToHead: 'Daughter',
            birthplace: 'Co Kildare',
            occupation: 'UNKNOWN',
            religion: 'Roman Catholic',
            soundex: 'J500S635',
            hisco: null,
            RELATED_TO_rel: {
              __typename: '_PersonRELATED_TO_relDirections',
              from: [],
              to: [
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-M650S635-10',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-M616S635-21',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-J520S635-4',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-P362S635-3',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-B632S635-28',
                },
                {
                  __typename: '_PersonRELATED_TO_rel',
                  name: 'J500S635-J500S635-7',
                },
              ],
            },
          },
        ],
        RELATED_TO_rel: {
          __typename: '_PersonRELATED_TO_relDirections',
          from: [
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'M616S635-J520S635-25',
            },
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'J500S635-J520S635-4',
            },
          ],
          to: [
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'J520S635-P362S635-1',
            },
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'J520S635-M650S635-14',
            },
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'J520S635-B632S635-24',
            },
            {
              __typename: '_PersonRELATED_TO_rel',
              name: 'J520S635-J500S635-11',
            },
          ],
        },
      },
    ],
  },
  loading: false,
  firstSearch: false,
}

test('renders without crashing', () => {
  render(<ResultsTable data={firstProps.data} firstSearch={true} />)
})

test('renders content of search', () => {
  const { getAllByText } = render(
    <ResultsTable data={firstProps.data} firstSearch={true} />
  )

  getAllByText('James')
  getAllByText('Sheridan')
  getAllByText('1881')
  getAllByText('M')
  getAllByText('Co Kildare')
  getAllByText('Postman')
  getAllByText('Roman Catholic')
  getAllByText('Nephew')
})

test('test dropdown', () => {
  const { getAllByText, getByTestId } = render(
    <ResultsTable data={firstProps.data} firstSearch={true} />
  )

  const button = getByTestId('dropdown')
  fireEvent.click(button)
  getAllByText('Search 1901')
})

test('matches snapshot', () => {
  const tree = renderer
    .create(<ResultsTable data={firstProps.data} firstSearch={true} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
