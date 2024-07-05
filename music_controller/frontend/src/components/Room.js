import React from "react";
import withRouter from "./higherOrderComponents/withRouter";
import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };

        // params is a prop we've added by wrapping this component with the withRouter HOC
        this.roomCode = this.props.params.roomCode;
    }

    componentDidMount() {
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    }

    render() {
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
                        Guest Can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        isHost: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Room);

// <div>
//     <h3>{this.roomCode}</h3>
//     <p>Votes: {this.state.votesToSkip}</p>
//     <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
//     <p>isHost: {this.state.isHost.toString()}</p>
// </div>
