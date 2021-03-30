import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import PersonData from '.././PersonData'

afterEach(cleanup)

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

test('renders without crashing', () => {
  render(
    <ApolloProvider client={client}>
      <PersonData />
    </ApolloProvider>
  )
})

test('renders with temporary content', () => {
  const { getByText } = render(
    <ApolloProvider client={client}>
      <PersonData />
    </ApolloProvider>
  )

  getByText('Loading')
})

test('matches snapshot', () => {
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <PersonData />
      </ApolloProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
