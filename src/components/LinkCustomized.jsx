import React from "react";
import { Link as ReactRouterLink } from 'react-router-dom'

const LinkCustomized = ({ to, children }) => {
    return(
        <ReactRouterLink to={to} className="block">
            {children}
        </ReactRouterLink>

    )

}


export default LinkCustomized;