import React, { Component } from "react";
import { Link } from "react-router-dom";
import withNavigate from "./higherOrderComponents/withNavigate";
import {
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

class RoomCreatePage extends Component {
    static defaultProps = {
        votesToSkip: 2,
        guestsCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            guestsCanPause: this.props.guestsCanPause,
            votesToSkip: this.props.votesToSkip,
        };
    }

    // Use arrow functions for handle methods as they can infer `this` binding
    handleVotesChange = (e) => {
        // No Type conversion from string to int needed because we will be stringifying JSON anyway
        this.setState({
            votesToSkip: e.target.value,
        });
    };

    handleGuestsCanPauseChange = (e) => {
        this.setState({
            guestsCanPause: e.target.value === "true" ? true : false,
        });
    };

    handleCreateRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Note use of snake case to keep JSON consistent with CreateRoomView
            body: JSON.stringify({
                guest_can_pause: this.state.guestsCanPause,
                votes_to_skip: this.state.votesToSkip,
            }),
        };
        // Send a post request of the defined options above
        // Then convert the response to JSON
        // Then navigate to the new room
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.navigate("/room/" + data.code));
    };

    renderCreateButtons = () => (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleCreateRoomButtonPressed}
                >
                    Create Room
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );

    renderUpdateButtons = () => (
        <Grid item xs={12}>
            <Button
                color="primary"
                variant="contained"
                onClick={this.handleCreateRoomButtonPressed}
            >
                Update Room
            </Button>
        </Grid>
    );

    render() {
        const title = this.props.update ? "Update Room" : "Create a Room";

        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography component="h4" variant="h4">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormHelperText>Guest Control of Playback State</FormHelperText>
                        <RadioGroup
                            row
                            //todo use state
                            defaultValue="true"
                            onChange={this.handleGuestsCanPauseChange}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            onChange={this.handleVotesChange}
                            defaultValue={this.state.votesToSkip}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                            }}
                        />
                        <FormHelperText>Votes Required To Skip Song</FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
            </Grid>
        );
    }
}

export default withNavigate(RoomCreatePage);
