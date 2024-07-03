import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import RoomCreatePage from "./RoomCreatePage";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // This block acts like a html switch statement, routing to each route depending on the url
            <Router>
                <Routes>
                    <Route path="/" element={<p>This is the home page</p>} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<RoomCreatePage />} />
                    <Route path="/room/:roomCode" element={<Room />} />
                </Routes>
            </Router>
        );
    }
}
