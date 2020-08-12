import React, { useCallback, useContext } from "react";
import app from "../../base";
import { useSelector } from "react-redux";
import { withRouter, Redirect } from "react-router";

    
const Login = ({ history }) => {
    
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    console.log(currentUser);

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
