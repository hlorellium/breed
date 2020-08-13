import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'

import firebase from "../../base";
import Collapse from "../Collapse/Collapse";
import "./Navbar.css";

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div className="navbar">
            <div className="container navbarContainer">
                <ul className="brandList">
                    <li className="brandIcon">
                        <span role="img" aria-label="goat">
                            🐐
                        </span>
                    </li>
                </ul>
                <ul className="navList">
                    <li>    
                        <NavLink to="/home" className="navbarItem">
                            Home
                        </NavLink>
                    </li>
                    <li>
                    <Collapse header="Animals">
                    <NavLink to="/animals" className="navbarItem">
                            Table
                        </NavLink>
                    <NavLink to="/addAnimal" className="navbarItem">
                            Add
                        </NavLink>
                       </Collapse>
  
                    </li>
                    <li>
                        <Collapse header={currentUser.email}>
                            <NavLink to="/profile" className="navbarItem">
                                Profile
                            </NavLink>
                            <span
                                onClick={() => firebase.auth().signOut()}
                                className="navbarItem"
                            >
                                Sign Out
                            </span>
                        </Collapse>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
