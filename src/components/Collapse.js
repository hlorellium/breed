import React, { useState } from 'react';
import styled from 'styled-components';

const СollapseStyles = styled.div`
    .collapseList {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        justify-content: space-evenly;
        height: auto;
    }

    .collapseList > .navbarItem {
        padding: 10px 20px;
    }
    .collapseList > .navbarItem:hover {
        background-color: var(--cyan);
    }

    .hidden {
        display: none !important;
    }

    .collapseContainer {
        position: absolute;
        background-color: var(--mint);
        overflow: auto;
        height: auto;

        top: 60px;
        width: 180px;
    }
`;

const Collapse = ({ children, header }) => {
    const [hidden, setHidden] = useState(true);

    return (
        <>
            <СollapseStyles>
                <span className='navbarItem' onClick={() => setHidden(!hidden)}>
                    {header}
                </span>
                <div className={hidden ? 'hidden' : 'collapseContainer'}>
                    <ul className='collapseList'>{children}</ul>
                </div>
            </СollapseStyles>
        </>
    );
};

export default Collapse;
