import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import GoogleMapHome from '../components/utils/maps/GoogleMapHome';

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

it('GoogleMapHome ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <GoogleMapHome />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("GoogleMapHome 2", async () => {
  const { getByText } = render(<GoogleMapHome  />);  
  
})
