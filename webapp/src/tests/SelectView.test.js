import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import SelectView from '../components/views/SelectView';



let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('Select', () => {
  act(() => {
    ReactDOM.render(<Router>
      <SelectView />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 