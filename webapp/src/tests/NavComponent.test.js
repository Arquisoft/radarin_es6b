import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import NavComponent from "../components/NavComponent";


test('check that LogIn is rendering propertly', async () => {
    const { getByText } = render(<NavComponent/>);
    
  });
