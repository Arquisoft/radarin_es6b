import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import TemporaryDrawer from '../components/utils/navbar/TemporaryDrawer';
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

it('TemporaryDrawer ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <TemporaryDrawer />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("TemporaryDrawer 2", async () => {
  const { getByText } = render(<TemporaryDrawer  />);  
})
