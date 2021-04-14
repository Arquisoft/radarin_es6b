import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import LoginBarView from '../components/views/LoginBarView';



let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('LoginBar', () => {
  act(() => {
    ReactDOM.render(<Router>
      <LoginBarView />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 