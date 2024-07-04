import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
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
                        onChange={this._handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
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

    _handleTextFieldChange = (e) => {
        this.setState({
            roomCode: e.target.value,
        });
    };
}
