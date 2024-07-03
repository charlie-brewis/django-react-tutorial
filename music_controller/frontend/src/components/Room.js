import React from "react";

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
    }

    render() {
        return (
            <div>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause}</p>
                <p>isHost: {this.state.isHost}</p>
            </div>
        );
    }
}
