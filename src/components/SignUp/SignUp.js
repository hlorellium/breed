import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../base";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(
        async (event, { setSubmitting }) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(
                        email.value,
                        password.value
                    );
                history.push("/");
            } catch (error) {
                alert(error);
            }
            setSubmitting(false);
        },
        [history]
    );

    return (
        <div>
            <h1>Sign Up</h1>
            {/* <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input type="email" placeholder="Email" name="email" />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form> */}
            <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = "Invalid email address";
                    }
                    return errors;
                }}
                onSubmit={handleSignUp}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default withRouter(SignUp);
