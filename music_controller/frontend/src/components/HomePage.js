import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import RoomCreatePage from "./RoomCreatePage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
    }

    // componentDidMount is a react lifecycle method - these control different stages of your component's lifecycle
    // componentDidMount runs after the component first renders onto the screen
    // Note, normally we dont need async for this method, but since we are performing an async operation inside it, we do
    async componentDidMount() {
        fetch("/api/user-in-room")
            .then((resposne) => resposne.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code,
                });
            });
    }

    renderHomePage() {
        return (
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography variant="h3" component="h4">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode = () => this.setState({ roomCode: null });

    render() {
        return (
            // This block acts like a html switch statement, routing to each route depending on the url
            <Router>
                <Routes>
                    <Route
                        path="/"
                        // if this.state.roomCode is null, render the home page, else, render to the room page
                        element={
                            this.state.roomCode ? (
                                <Navigate to={`/room/${this.state.roomCode}`} />
                            ) : (
                                this.renderHomePage()
                            )
                        }
                    />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<RoomCreatePage />} />
                    <Route
                        path="/room/:roomCode"
                        element={<Room leaveRoomCallback={this.clearRoomCode} />}
                    />
                </Routes>
            </Router>
        );
    }
}
