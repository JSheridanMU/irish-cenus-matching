import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import RadioGroup from '.././RadioGroup'

afterEach(cleanup)
const items = [
  { id: '1901', title: '1901' },
  { id: '1911', title: '1911' },
]

test('renders without crashing', () => {
  render(<RadioGroup label="Test Label" items={items} />)
})

test('renders button with text', () => {
  const { getAllByText, getByText } = render(
    <RadioGroup label="Test Label" items={items} />
  )

  getAllByText('Test Label')
  getByText('1901')
  getByText('1911')
})

test('matches snapshot', () => {
  const tree = renderer
    .create(<RadioGroup label="Test Label" items={items} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
