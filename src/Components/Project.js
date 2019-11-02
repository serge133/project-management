import React from 'react';
import { Link } from 'react-router-dom';
export const Wrapper = ({ children, project }) => {
    return (
        <div className="project">
            <h1>{project.name}</h1>
            <h2>{project.description.substring(0, 50)} {project.description.length > 50 ? '...' : null}</h2>
            <hr/>
            <h3>Number of Tasks: {project.tasks.length}</h3>
            { children }
        </div>
    )
};


export const ControlPanel = ({ deleteProject, id }) => {
    return (
        <section className="control_panel">
            <Link to={`/projects/${id}`}><button>Open</button></Link>
            <button onClick={deleteProject}>Delete</button>
        </section>
    );
};