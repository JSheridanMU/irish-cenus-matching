import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Dashboard from '.././Dashboard'

afterEach(cleanup)

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

test('renders without crashing', () => {
  render(
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  )
})

test('renders with temporary content', () => {
  const { getByText, getAllByText } = render(
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  )

  getByText('1901')
  getByText('1901')
  getAllByText('Loading')
})

test('matches snapshot', () => {
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <Dashboard />
      </ApolloProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
