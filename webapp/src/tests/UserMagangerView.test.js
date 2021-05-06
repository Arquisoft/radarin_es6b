import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import UserMagangerView from '../components/views/UserMagangerView';
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

it('UserMagangerView ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <UserMagangerView />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("UserMagangerView 2", async () => {
  const { getByText } = render(<UserMagangerView  />);
  expect(getByText("To stop being an administrator click here")).toBeInTheDocument();
  expect(getByText("Users list")).toBeInTheDocument();
  expect(getByText("Be a standard user")).toBeInTheDocument();
  
})
