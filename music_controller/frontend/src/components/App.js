import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import RoomCreatePage from "./RoomCreatePage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomePage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
// Create a react root inside the appDiv so we can render our react components
const root = ReactDOM.createRoot(appDiv);
root.render(<App />);
