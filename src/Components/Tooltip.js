import React from 'react';

const Tooltip = ({ children, top, left, show }) => {

    const style ={
        display: show ? null : 'none',
        position: 'absolute',
        top: top,
        left: left
    }


    return (
        <div className="tooltip" style={style}>
            <div className="arrow"/>
            {children}
        </div>
    )
}

export default Tooltip