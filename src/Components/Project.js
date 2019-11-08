import React from "react";
import { Link } from "react-router-dom";
export const Wrapper = ({ children, project }) => {
  const { name, description, tasks } = project;
  const numberOfTasks = tasks.length;
  return (
    <div className="project">
      <h1 className="name">{name}</h1>
      <h6 className="description">
        {description.substring(0, 200)}{" "}
        {description.length > 200 ? "..." : null}
      </h6>
      <h3 className="number_tasks">{numberOfTasks} Tasks</h3>
      {children}
    </div>
  );
};

export const ControlPanel = ({ deleteProject, id }) => {
  return (
    <section className="control_panel">
      <Link to={`/projects/${id}`}>
        <button>Open</button>
      </Link>
      <button onClick={deleteProject}>Delete</button>
    </section>
  );
};
