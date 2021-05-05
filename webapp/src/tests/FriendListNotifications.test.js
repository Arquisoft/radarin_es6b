import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import FriendListNotifications from '../components/utils/user/notifications/FriendListNotifications';

import { render } from "@testing-library/react";



let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('FriendListNotifications ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <FriendListNotifications />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("FriendListNotifications 2", async () => {
  const { getByText } = render(<FriendListNotifications  />);  
  
})
