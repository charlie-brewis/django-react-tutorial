import React from "react";
import { useParams } from "react-router-dom";
import withRouter from "./withRouter";

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        console.log(this.state);

        // match is a prop that react-router adds to any visited route, it holds all the URL parameters
        this.roomCode = this.props.params.roomCode;
    }

    componentDidMount() {
        this.getRoomDetails();
        console.log(this.state);
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
            <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>isHost: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}

export default withRouter(Room);
