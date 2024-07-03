import React from "react";
import { useParams } from "react-router-dom";

// This component allows us to wrap components so that they can receive URL parameters as props.params

const withRouter = (Component) => {
    return (props) => {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
};

export default withRouter;
