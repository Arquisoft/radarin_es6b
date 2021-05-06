import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import "./index.css";
import App from "./App";
jest.mock("react-dom", () => ({ render: jest.fn() }));
test("root div", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.append(div);
        require("./index.js");
        expect(ReactDOM.render).toHaveBeenCalledWith(
            <React.Fragment>
                        <App />
            </React.Fragment>, div);
});