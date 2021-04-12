import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import LogIn from "../components/LogIn";
import { render } from "@testing-library/react";


test('check that LogIn is rendering propertly', async () => {
    const { getByText } = render(<LogIn/>);
    expect(getByText("Access")).toBeInTheDocument();
  });