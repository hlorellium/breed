import React from "react";
import { withRouter } from "react-router";
import app from "../../base";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignUp = ({ history }) => {
    return (
        <div>
            <h1>Sign Up</h1>
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
                            .createUserWithEmailAndPassword(
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
                            Sign In
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default withRouter(SignUp);
