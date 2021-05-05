import React from "react";
import ReactDOM from "react-dom";
import HomeView from "../components/views/HomeView";
import { act } from 'react-dom/test-utils';
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import LoadGoogleMap from '../components/utils/maps/LoadGoogleMap';


let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})



afterEach(() => {
  document.body.removeChild(container)
  container = null
})



it('HomeView', () => {
  act(() => {
    ReactDOM.render(<Router>
      <HomeView />
    </Router>, container)
  });
  expect(container.querySelector('#div1')).toBeTruthy();
  
 
});
test("Home view", async () => {
  render(<LoadGoogleMap /> );
  const { getByText } = render(<HomeView />);
  
})

