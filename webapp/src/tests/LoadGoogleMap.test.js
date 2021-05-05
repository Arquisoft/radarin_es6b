import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import LoadGoogleMap from '../components/utils/maps/LoadGoogleMap';

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

it('LoadGoogleMap ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <LoadGoogleMap />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("LoadGoogleMap 2", async () => {
  const { getByText } = render(<LoadGoogleMap  />);  
  
})
