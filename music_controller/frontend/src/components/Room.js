import React from "react";
import withRouter from "./withRouter";
class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        console.log(this.props.match);

        // match is a prop that react-router adds to any visited route, it holds all the URL parameters
        this.roomCode = this.props.params.roomCode;
    }

    render() {
        return (
            <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause}</p>
                <p>isHost: {this.state.isHost}</p>
            </div>
        );
    }
}

export default withRouter(Room);
