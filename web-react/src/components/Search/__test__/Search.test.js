import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Search from '.././Search'

afterEach(cleanup)

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

test('renders without crashing', () => {
  render(<Search />)
})

test('renders with search fields', () => {
  const { getByText, getAllByText } = render(<Search />)

  getByText('Search')
  getByText('Sex')
  getByText('Year')
  getByText('Male')
  getByText('Female')
  getByText('Both')
  getByText('1901')
  getByText('1911')
  getAllByText('Forename')
  getAllByText('Surname')
  getAllByText('Age')
  getAllByText('County')
  getAllByText('Townland/Street')
  getAllByText('DED')
})

test('submission triggers search', () => {
  const { getByText, getByTestId } = render(
    <ApolloProvider client={client}>
      <Search />
    </ApolloProvider>
  )

  const button = getByText('Submit')
  fireEvent.click(button)
  getByTestId('search rendered')
})

test('matches snapshot', () => {
  const tree = renderer.create(<Search />).toJSON()
  expect(tree).toMatchSnapshot()
})
