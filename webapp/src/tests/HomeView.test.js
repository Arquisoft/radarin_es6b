import React from "react";

import ReactDOM from "react-dom";

import HomeView from "../components/views/HomeView";

import { act } from 'react-dom/test-utils';

import { render } from "@testing-library/react";

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

it('HomeView', () => {
  act(() => {
    ReactDOM.render(<Router>
      <HomeView />
    </Router>, container)
  });

  const titulo = container.querySelector('h1');
  expect(titulo).toBeTruthy();
});

test("check that we are in the nav bar", async () => {

  const { getByText } = render(<HomeView />);

  expect(getByText("Radarin Map")).toBeInTheDocument();

})