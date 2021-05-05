import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import FriendsView from '../components/views/FriendsView';
import { render } from "@testing-library/react";
import FriendListEvaluate from '../components/utils/user/friends/FriendsListEvaluate';
import GoogleMapFriends from '../components/utils/maps/GoogleMapFriends';

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('Friends', () => {
  act(() => {
    ReactDOM.render(<Router>
      <FriendsView />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("Friends view", async () => {
  render(<FriendListEvaluate /> );
  render(<GoogleMapFriends /> );
  const { getByText } = render(<FriendsView />);
  expect(getByText("Friends")).toBeInTheDocument();
  expect(getByText("Map")).toBeInTheDocument();
})