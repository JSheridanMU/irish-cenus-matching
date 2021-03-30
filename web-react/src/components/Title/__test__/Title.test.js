import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Title from '.././Title'

afterEach(cleanup)

test('renders without crashing', () => {
  render(<Title>Test Title</Title>)
})

test('renders title with text content', () => {
  const { getByText } = render(<Title>Test Title</Title>)

  getByText('Test Title')
})

test('matches snapshot', () => {
  const tree = renderer.create(<Title>Test Title</Title>).toJSON()
  expect(tree).toMatchSnapshot()
})
