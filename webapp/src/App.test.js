import { render, screen } from '@testing-library/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils';


let container


beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('App', () => {

  act(() => {
    ReactDOM.render(
      <CssBaseline />, container)
  })
})


  

