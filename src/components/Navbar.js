import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from '../base';
import Collapse from './Collapse';

import { Container } from './Styles';

const NavbarStyles = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--mint);
    height: 60px;
`;
const NavbarContainer = styled(Container)`
    justify-content: space-between;
    align-items: center;

    ul {
        list-style: none;
    }

    .brandIcon {
        font-size: 2rem;
    }

    .navList {
        display: flex;
        width: 50%;
        justify-content: space-evenly;
    }

    .navbarItem {
        color: var(--black);
        text-decoration: none;
        cursor: pointer;
        font-weight: 500;
        transition: 50ms ease-in;
        padding: 0 20px;
    }

    .navbarItem:hover {
        color: var(--salmon);
        transition: 50ms ease-out;
    }

    .navbarItem.active {
        color: var(--salmon);
    }
`;

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <NavbarStyles>
            <NavbarContainer>
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
            </NavbarContainer>
        </NavbarStyles>
    );
};

export default Navbar;
