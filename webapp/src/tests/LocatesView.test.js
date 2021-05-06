import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import LocatesView from '../components/views/LocatesView';
import { render } from "@testing-library/react";
import GoogleMapLocates from '../components/utils/maps/GoogleMapLocates';
import LocatesList from '../components/utils/locate/LocatesList';
import Locate from '../components/utils/locate/Locate';
import Locations from '../components/utils/locate/Locations';
import LocateMark from '../components/utils/locate/locateMark/LocateMark';
import LocatesMarksEvaluate from '../components/utils/locate/locateMark/LocatesMarksEvaluate';
import LocatesMarksList from '../components/utils/locate/locateMark/LocatesMarksList';
let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('Locates', () => {
  act(() => {
    ReactDOM.render(<Router>
      <LocatesView />
    </Router>, container)
  })

  expect(container.querySelector('#grid1')).toBeTruthy();
  expect(container.querySelector('#grid2')).toBeTruthy();
 

  expect(container).toBeTruthy();
 
}) 

test("Locates view", async () => {
  render(<GoogleMapLocates /> );
 // render(<Locate /> );
  render(<LocatesList /> );
  render(<React.Fragment /> );
  //render(<Locations /> );
 // render(<LocateMark /> );
  render(<LocatesMarksEvaluate /> );
  //render(<LocatesMarksList /> );
  const { getByText } = render(<LocatesView />);
  expect(getByText("Locates")).toBeInTheDocument();
  expect(getByText("Map")).toBeInTheDocument();
  expect(getByText("Click on one of your locates to see in the map")).toBeInTheDocument();
  
  
})