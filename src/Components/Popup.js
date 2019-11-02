import React from 'react';

const Popup = ({ children, close }) => {
    return (
        <div className="fade_screen">
            <div className="close_popup" onClick={close}>x</div>
            <section className="popup">
                {children}
            </section>
        </div>
  
    )
};

export default Popup