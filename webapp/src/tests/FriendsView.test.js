import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import FriendsView from '../components/views/FriendsView';



let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('Friends', () => {
  act(() => {
    ReactDOM.render(<Router>
      <FriendsView />
    </Router>, container)
  })

  expect(container).toBeTruthy();
  //expect(getByText("Friends")).toBeInTheDocument();
}) 