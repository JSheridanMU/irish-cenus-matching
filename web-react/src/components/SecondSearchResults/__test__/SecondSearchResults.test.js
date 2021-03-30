import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import SecondSearchResults from '.././SecondSearchResults'

afterEach(cleanup)

const values = {
  year: '1911',
  forename: 'James',
  surname: 'Sheridan',
  county: '',
  townland: '',
  ded: '',
  age: '30',
  sex: 'both',
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

test('renders without crashing', () => {
  render(
    <ApolloProvider client={client}>
      <SecondSearchResults values={values} />
    </ApolloProvider>
  )
})

test('matches snapshot', () => {
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <SecondSearchResults values={values} />
      </ApolloProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
