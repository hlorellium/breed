import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import firebase from "../../base";
import Collapse from "../Collapse/Collapse";
import "./Navbar.css";
import { AuthContext } from "../Auth";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

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
                        <NavLink to="/" className="navbarItem">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/animals" className="navbarItem">
                            Animals
                        </NavLink>
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
