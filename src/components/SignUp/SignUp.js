import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../../base";

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        email.value,
                        password.value
                    );
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input type="email" placeholder="Email" name="email" />
                </label>
                <label>
                    Password
                    <input type="password" placeholder="Password" name="password" />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default withRouter(SignUp);
