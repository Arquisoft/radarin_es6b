import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import FriendsListEvaluate from '../components/utils/user/friends/FriendsListEvaluate';
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

it('FriendsListEvaluate ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <FriendsListEvaluate />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("FriendsListEvaluate 2", async () => {
  const { getByText } = render(<FriendsListEvaluate  />);  
  //expect(getByText("Make Admin")).toBeInTheDocument();
})





  
 