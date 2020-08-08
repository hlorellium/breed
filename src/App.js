import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/SignUp" component={SignUp} />
            </Router>
        </AuthProvider>
    );
}

export default App;
