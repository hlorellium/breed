import React from "react";
import app from "../../base";
import { useSelector } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { Form, Field, ErrorMessage, Formik } from "formik";

const Login = ({ history }) => {
    const currentUser = useSelector((state) => state.user.currentUser);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1>Log In</h1>
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
                onSubmit={async (values) => {
                    try {
                        await app
                            .auth()
                            .signInWithEmailAndPassword(
                                values.email,
                                values.password
                            );
                    } catch (error) {
                        alert(error);
                    }
                    history.push("/home");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Log in
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default withRouter(Login);
