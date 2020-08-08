import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

export default PrivateRoute;
