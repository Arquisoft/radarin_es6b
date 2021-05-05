import React from "react";
import ReactDOM from "react-dom";
import AboutView from "../components/views/AboutView";
import { act } from 'react-dom/test-utils';
import { render,fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import TeamMember from '../components/utils/team/TeamMember';

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
    enlace.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  //expect(enlace).toBeCalledTimes(1);

  expect(container.querySelector('#doc')).toBeTruthy();
  expect(container.querySelector('#card1')).toBeTruthy();
  expect(container.querySelector('#card2')).toBeTruthy();
  expect(container.querySelector('#grid1')).toBeTruthy();
  expect(container.querySelector('#grid2')).toBeTruthy();
  expect(container.querySelector('#grid3')).toBeTruthy();
  expect(container.querySelector('#grid4')).toBeTruthy();
  expect(container.querySelector('#grid5')).toBeTruthy();
  expect(container.querySelector('#img1')).toBeTruthy();
  expect(container.querySelector('#but1')).toBeTruthy();
  expect(container.querySelector('#but2')).toBeTruthy();
  expect(container.querySelector('#but3')).toBeTruthy();
  expect(container.querySelector('#but4')).toBeTruthy();
  expect(container).toBeTruthy();


})

test("About view", async () => {
  const { getByText } = render(<AboutView />);
  render(<TeamMember /> );
  const element = screen.getByText("Engeniaring team");
        expect(element).toBeInTheDocument();
  const element1 = screen.getByText("Radarin is an application to get your ubication and see who of your solid friend's is near to you. You can also create locates to save your favourite places.");
        expect(element1).toBeInTheDocument();
  const element2 = screen.getByText("Go to the documentation:");
        expect(element2).toBeInTheDocument();
 
 expect(getByText("The team that has developed the web page in the ASW subject of the university of oviedo of infoematic engineering in 2021:")).toBeInTheDocument();
})