import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import withNavigate from "./higherOrderComponents/withNavigate";

class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: false,
            errorMessage: "",
        };
    }

    render() {
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Code"
                        placeholder="Enter a Room Code"
                        variant="outlined"
                        value={this.state.roomCode}
                        error={this.state.error}
                        helperText={this.state.errorMessage}
                        onChange={this.handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleEnterRoomButtonPressed}
                    >
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    handleTextFieldChange = (e) => {
        this.setState({
            roomCode: e.target.value,
        });
    };

    handleEnterRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: this.state.roomCode,
            }),
        };

        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.props.navigate(`/room/${this.state.roomCode}`);
                } else {
                    this.setState({
                        error: true,
                        errorMessage: "Room Not Found",
                    });
                }
            })
            .catch((error) => console.log(error));
    };
}

export default withNavigate(RoomJoinPage);
