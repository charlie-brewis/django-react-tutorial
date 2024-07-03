import React from "react";
import ReactDOM from "react-dom/client";

export class App extends React.Component {
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
root.render(<App />);
