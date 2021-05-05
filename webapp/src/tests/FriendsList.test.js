import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import FriendsList from '../components/utils/user/friends/FriendsList';
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

it('FriendsList ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <FriendsList />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("FriendsList 2", async () => {
  const { getByText } = render(<FriendsList  />);  
  //expect(getByText("Make Admin")).toBeInTheDocument();
})





  
 