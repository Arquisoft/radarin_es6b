import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/views/NavBar";
import { act } from 'react-dom/test-utils';

import { BrowserRouter as Router } from 'react-router-dom';

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

  })

  

  expect(container).toBeTruthy()
  expect(container.querySelector('#img')).toBeTruthy();
  

}) 