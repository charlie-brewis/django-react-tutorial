import React, { Component, component } from "react";
import ReactDOM from "react-dom/client";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Testing React Code</h1>;
    }
}

const appDiv = document.getElementById("app");
// Create a react root inside the appDiv so we can render our react components
const root = ReactDOM.createRoot(appDiv);
root.render(<App />)