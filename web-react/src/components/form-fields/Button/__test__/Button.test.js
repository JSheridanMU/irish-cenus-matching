import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Button from '.././Button'

afterEach(cleanup)

test('renders without crashing', () => {
  render(<Button text={'Test Button'} />)
})

test('renders button with text', () => {
  const { getByText } = render(<Button text={'Test Button'} />)

  getByText('Test Button')
})

test('matches snapshot', () => {
  const tree = renderer.create(<Button text={'Test Button'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
