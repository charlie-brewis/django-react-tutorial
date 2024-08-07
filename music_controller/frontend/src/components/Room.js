import React from "react";
import withRouter from "./higherOrderComponents/withRouter";
import withNavigate from "./higherOrderComponents/withNavigate";
import RoomCreatePage from "./RoomCreatePage";
import { Grid, Button, Typography } from "@mui/material";

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestsCanPause: false,
            isHost: false,
            showingSettings: false,
        };

        // params is a prop we've added by wrapping this component with the withRouter HOC
        this.roomCode = this.props.params.roomCode;
    }

    componentDidMount() {
        this.getRoomDetails();
    }

    getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => {
                // If the response is invalid, i.e., the room doesnt exist on the db, return to the home page
                if (!response.ok) {
                    this.props.leaveRoomCallback();
                    this.props.navigate("/");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestsCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    };

    handleLeaveRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((response) => {
            this.props.leaveRoomCallback();
            this.props.navigate("/");
        });
    };

    updateShowingSettings = (value) => this.setState({ showingSettings: value });

    renderSettingsButton = () => (
        <Grid item xs={12}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => this.updateShowingSettings(true)}
            >
                Settings
            </Button>
        </Grid>
    );

    renderSettingsPage = () => (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <RoomCreatePage
                    update={true}
                    votesToSkip={this.state.votesToSkip}
                    guestsCanPause={this.state.guestsCanPause}
                    roomCode={this.roomCode}
                    updateCallback={this.getRoomDetails}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.updateShowingSettings(false)}
                >
                    Close
                </Button>
            </Grid>
        </Grid>
    );

    render() {
        if (this.state.showingSettings) return this.renderSettingsPage();
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        Guest Can Pause: {this.state.guestsCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        isHost: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleLeaveRoomButtonPressed}
                    >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withNavigate(withRouter(Room));
