import React, { useState, Fragment } from "react";
import Timer from "../Core/Timer";
import Popup from "./Popup";
import Calendar from "react-calendar";

export const Controller = ({ project, changeProjectName, children }) => {
  const { name, description, due } = project;

  /**
   * TODO: make the due fit in with the timer
   */
  return (
    <section className="project_controller">
      <input
        className="name"
        defaultValue={name}
        onChange={changeProjectName}
      />
      <h6 className="due">{new Date(due).toDateString()}</h6>
      {children}
    </section>
  );
};

export const ControlPanel = ({ due, setDueDate }) => {
  const [calendarPopup, setCalendarPopup] = useState(false);
  const toggleCalendarPopup = () => setCalendarPopup(!calendarPopup);
  const CalendarPopup = (
    <Popup close={toggleCalendarPopup}>
      <Calendar
        minDate={new Date() /* Today */}
        onChange={setDueDate}
        value={new Date(due)}
      />
      <section className="popup_control-panel">
        <button onClick={toggleCalendarPopup}>Submit</button>
      </section>
    </Popup>
  );

  return (
    <Fragment>
      {calendarPopup ? CalendarPopup : null}
      <div onClick={toggleCalendarPopup}>
        <Timer due={due} onClick={toggleCalendarPopup} />
      </div>
    </Fragment>
  );
};
