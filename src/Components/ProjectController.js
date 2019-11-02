import React, { useState, Fragment } from 'react';
import Timer from '../Core/Timer';
import Popup from './Popup';
import Calendar from 'react-calendar';


export const Controller = ({ project, children }) => {
    const { name, description, due} = project;

    return (
        <section className="project_controller">
                <h1 className="name">{name}</h1>
                <h2 className="description">{description.substring(0, 100)}</h2>
                { children }
                <Timer due={due}/>
        </section>
    )
};

export const ControlPanel = ({ due, setDueDate }) => {
    const [calendarPopup, setCalendarPopup] = useState(false);
    const toggleCalendarPopup = () => setCalendarPopup(!calendarPopup);
    const CalendarPopup = (
        <Popup close={toggleCalendarPopup}>
            <Calendar
                minDate={new Date() /* Today */}
                onChange={setDueDate}
                value={new Date(due)}/>
            <section className="popup_control-panel">
                <button onClick={toggleCalendarPopup}>Submit</button>
            </section>
        </Popup>
    )
    
    return (
        <Fragment>
            {calendarPopup ? CalendarPopup: null }
        <div className="control_panel">
            
            <button onClick={toggleCalendarPopup}>{ new Date(due).toDateString() }</button>
            
        </div>
        </Fragment>
        
    )
}
