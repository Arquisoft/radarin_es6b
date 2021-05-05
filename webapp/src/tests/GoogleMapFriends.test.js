import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import GoogleMapFriends from '../components/utils/maps/GoogleMapFriends';

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

it('GoogleMapFriends ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <GoogleMapFriends />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("GoogleMapFriends 2", async () => {
  const { getByText } = render(<GoogleMapFriends  />);  
  
})
