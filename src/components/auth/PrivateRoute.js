import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import {   BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

export default withRouter(PrivateRoute);
