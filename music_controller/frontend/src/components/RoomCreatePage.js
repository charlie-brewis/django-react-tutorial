import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import withNavigate from "./higherOrderComponents/withNavigate";

class RoomCreatePage extends Component {
    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestsCanPause: true,
            votesToSkip: this.defaultVotes,
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
        // Send a fetch request of the defined options above
        // Then convert the response to JSON
        // Then log that JSON data
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.navigate("/room/" + data.code));
    };

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText align="center">
                            Guest Control of Playback State
                        </FormHelperText>
                        <RadioGroup
                            row
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
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            onChange={this.handleVotesChange}
                            defaultValue={this.defaultVotes}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                            }}
                        />
                        <FormHelperText align="center">Votes Required To Skip Song</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleCreateRoomButtonPressed}
                    >
                        Create Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withNavigate(RoomCreatePage);
