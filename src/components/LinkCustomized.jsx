import React from "react";
import { Link as ReactRouterLink } from 'react-router-dom'

const LinkCustomized = ({ to, children, onClick }) => {
    return(
        <ReactRouterLink to={to} onClick={onClick} className="block">
            {children}
        </ReactRouterLink>

    )

}


export default LinkCustomized;