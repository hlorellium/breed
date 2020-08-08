import React, { useCallback, useContext } from "react";
import firebase from "../../base";
import { AuthContext } from "../Auth";
import { withRouter, Redirect } from "react-router";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input type="email" name="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </label>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default withRouter(Login);
