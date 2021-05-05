import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import NavBar from '../components/views/NavBar';
import TemporaryDrawer from '../components/utils/navbar/TemporaryDrawer';
import GetProfile from '../components/utils/solid/GetProfile'
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

it('NavBar', () => {
  act(() => {
    ReactDOM.render(<Router>
      <NavBar />
    </Router>, container)
    render(<TemporaryDrawer /> );
  })

  expect(container).toBeTruthy();
}); 
test("NavBar view", async () => {
    
    render(<GetProfile /> );
})