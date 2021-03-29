import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Select from '.././Select'

afterEach(cleanup)
const options = [
  { id: '1901', title: '1901' },
  { id: '1911', title: '1911' },
]

test('renders without crashing', () => {
  render(<Select label="Test Label" options={options} />)
})

test('renders select with label', () => {
  const { getAllByText } = render(
    <Select label="Test Label" options={options} />
  )

  getAllByText('Test Label')
})

test('matches snapshot', () => {
  const tree = renderer
    .create(<Select label="Test Label" options={options} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
