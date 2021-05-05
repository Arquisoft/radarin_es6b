import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import GoogleMapLocates from '../components/utils/maps/GoogleMapLocates';

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

it('GoogleMapLocates ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <GoogleMapLocates />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("GoogleMapLocates 2", async () => {
  const { getByText } = render(<GoogleMapLocates  />);  
  
})
