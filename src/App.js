import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import Home from './components/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/PrivateRoute';
import { setCurrentUser } from './Redux/Actions/userActions';

import app from './base';
import './App.css';
import AnimalsTable from './components/AnimalsTable/AnimalsTable';
import Profile from './components/Profile';
import AnimalForm from './components/AnimalForm';

const App = ({ setCurrentUser }) => {
    useEffect(() => {
        app.auth().onAuthStateChanged((newUser) => setCurrentUser(newUser));
    }, [setCurrentUser]);

    return (
        <Router>
            <PrivateRoute exact path='/home' component={Home} />
            <PrivateRoute exact path='/animals' component={AnimalsTable} />
            <PrivateRoute exact path='/addAnimal' component={AnimalForm} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/SignUp' component={SignUp} />
        </Router>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { setCurrentUser })(App);
