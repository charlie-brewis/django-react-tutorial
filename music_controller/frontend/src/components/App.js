import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import RoomCreatePage from "./RoomCreatePage";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center">
                <HomePage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
// Create a react root inside the appDiv so we can render our react components
const root = ReactDOM.createRoot(appDiv);
root.render(<App />);
