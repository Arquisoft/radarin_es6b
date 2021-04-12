import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/views/NavBar";
import { act } from 'react-dom/test-utils';
import { render } from "@testing-library/react";

test("check that the login button renders properly", async () => {
  const { getByText } = render(<NavBar/>);
});
