import React from "react";
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils';
import { render, wait, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactNotification from "react-notifications-component";
import { store } from 'react-notifications-component';


let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})



afterEach(() => {
  document.body.removeChild(container)
  container = null
})



it('ReactNotification', () => {
  act(() => {
    ReactDOM.render(<Router>
      <ReactNotification />
    </Router>, container)
  });
  
});
test("Show Notification", async () => {
  const { getByText } = render(<ReactNotification />);
  store.addNotification({
    id: "IDDEprueba",
    title: "Prueba de notificacion",
    message: "Close friend",
    type: "info",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    icon: "../img/logoNotificacion.png",
    dismiss: {
      duration: 500000,
      onScreen: true
    }
  });
  expect(getByText("Prueba de notificacion")).toBeInTheDocument();
});
