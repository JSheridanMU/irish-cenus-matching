import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Input from '.././Input'

afterEach(cleanup)

test('renders without crashing', () => {
  render(<Input label="Test Label" />)
})

test('renders button with text', () => {
  const { getAllByText } = render(<Input label="Test Label" />)

  getAllByText('Test Label')
})

test('matches snapshot', () => {
  const tree = renderer.create(<Input label="Test Label" />).toJSON()
  expect(tree).toMatchSnapshot()
})
