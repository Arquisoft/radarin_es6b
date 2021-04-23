import React from "react";
import ReactDOM from "react-dom";
import HomeView from "../components/views/HomeView";
import { act } from 'react-dom/test-utils';
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent } from "@testing-library/react";


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
  
});
test("Home view", async () => {
  const { getByText } = render(<HomeView />);
  //expect(getByText("Radarin Map")).toBeInTheDocument();
})

//test("check that we can move to friends view", async () => {
  //const { getByText, getByAltText } = render(<HomeView />);
  //const titulo = container.querySelector('button');
 // enlace.dispatchEvent(new MouseEvent('click', {bubbles: true}));
 // expect(getByText("Locates")).toBeInTheDocument();
  //fireEvent.click(getByAltText("Log out"));
  //expect(getByText("Welcome to Radarin_6b")).toBeInTheDocument();
//});