import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import TeamMember from '../components/utils/team/TeamMember';

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

it('TeamMember ', () => {
  act(() => {
    ReactDOM.render(<Router>
      <TeamMember />
    </Router>, container)
  })

  expect(container).toBeTruthy();
}) 

test("TeamMember 2", async () => {
  const { getByText } = render(<TeamMember  />);  
  
})
