import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import MapList from '../components/utils/maps/MapList';

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

it('MapList ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <MapList />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("MapList 2", async () => {
  const { getByText } = render(<MapList  />);  
  
})
