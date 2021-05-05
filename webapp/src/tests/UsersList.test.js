import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import UsersList from '../components/utils/user/UsersList';

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

it('UsersList ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <UsersList />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("UsersList 2", async () => {
  const { getByText } = render(<UsersList  />);  
  
})
