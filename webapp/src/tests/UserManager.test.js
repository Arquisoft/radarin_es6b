import React from "react";
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils';
import { render,fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import UserManagerView from "../components/views/UserMagangerView";
import UsersList from '../components/utils/user/UsersList';

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('UserManager', () => {
  act(() => {
    ReactDOM.render(<Router>
      <UserManagerView />
    </Router>, container)
  })

  
  expect(container.querySelector('#card1')).toBeTruthy();
  expect(container.querySelector('#card2')).toBeTruthy();
  expect(container.querySelector('#grid1')).toBeTruthy();
  expect(container.querySelector('#div1')).toBeTruthy();
  expect(container.querySelector('#but1')).toBeTruthy();
  expect(container).toBeTruthy();
}) 

test("User manager view", async () => {
    render(<UsersList /> );
    
    const { getByText } = render(<UserManagerView />);
  
    const element = screen.getByText("Be a standard user");
          expect(element).toBeInTheDocument();
     })

