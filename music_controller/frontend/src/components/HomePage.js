import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import RoomCreatePage from "./RoomCreatePage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
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

    render() {
        return (
            // This block acts like a html switch statement, routing to each route depending on the url
            <Router>
                <Routes>
                    <Route path="/" element={this.renderHomePage()} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<RoomCreatePage />} />
                    <Route path="/room/:roomCode" element={<Room />} />
                </Routes>
            </Router>
        );
    }
}
