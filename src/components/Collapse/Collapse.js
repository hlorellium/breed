import React, { useState } from "react";

import "./Collapse.css";

const Collapse = ({ children, header }) => {
    const [hidden, setHidden] = useState(true);

    return (
        <>
            <span className="navbarItem" onClick={() => setHidden(!hidden)}>
                {header}
            </span>
            <div className={hidden ? "hidden" : "collapseContainer"}>
                <ul className="collapseList">{children}</ul>
            </div>
        </>
    );
};

export default Collapse;
