import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/views/NavBar";
import { render, fireEvent } from "@testing-library/react";

test('check that NavBar is rendering propertly', async () => {
    const { getByText } = ReactDOM.render(<NavBar/>);
    expect(getByText("")).toBeInTheDocument();
  });
