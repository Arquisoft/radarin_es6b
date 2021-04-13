import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import LocatesView from '../components/views/LocatesView';



let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('Locates', () => {
  act(() => {
    ReactDOM.render(<Router>
      <LocatesView />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 