import React from 'react';
import { URL } from '../Config/Database';
import {
    Wrapper,
    ControlPanel
} from '../Components/Project';
import axios from 'axios';

import Timer from './Timer';
const Project = props => {
    const {
        project,
        projects,
        setProjects,
    } = props;

    // * Actions
    const deleteProject = () => {
        const copyProjects = [...projects];
        const projectIndex = copyProjects.findIndex( p=> p.id === project.id);
        if(projectIndex < 0)return;
        copyProjects.splice(projectIndex, 1);
        setProjects(copyProjects);
        axios.delete(URL + `/projects/${project.id}.json`);
    };

    return (
        <Wrapper project = {project} >
            <Timer due={project.due}/>
            <ControlPanel
                deleteProject={deleteProject}
                id={project.id}/>
        </Wrapper>
    );
};

export default Project;