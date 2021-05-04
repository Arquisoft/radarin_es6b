import React from "react";
import ReactDOM from "react-dom";
import AboutView from "../components/views/AboutView";
import { act } from 'react-dom/test-utils';
import { render, fireEvent,screen } from "@testing-library/react";
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

it('About', () => {
  act(() => {
    ReactDOM.render(<Router>
      <AboutView />
    </Router>, container)
  });

  const enlace = container.querySelector('a');  
 
  act(() => {
    enlace.dispatchEvent(new MouseEvent('click', {bubbles: true}));    
  });
  
  //expect(enlace).toBeCalledTimes(1);

  expect(container.querySelector('#doc')).toBeTruthy();
  expect(container).toBeTruthy();


})

test("About view", async () => {
  const { getByText } = render(<AboutView />);

  expect(getByText("About")).toBeInTheDocument();
})