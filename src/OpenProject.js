import React, { useState, useEffect } from 'react';
import './css/OpenProject.css'
import axios from 'axios';
import { URL } from './Config/Database';

// Project Controller
import {
    Controller as ProjectController,
    ControlPanel,
} from './Components/ProjectController';

// Project Task List
import TaskList from './Core/ProjectTaskList';

// Project Task Bubbles
import Bubbles from './Core/ProjectTaskBubbles';

import TaskSearch from './Core/TaskSearch';



const Project = ({ match }) => {

    // * Initializer
    const { projectID } = match.params;

    const [project, setProject] = useState({
        id: '',
        name: '',
        description: '',
        // default date
        due: new Date(),
        tasks: [],
        editMode: false
    });

    useEffect(() => {
        axios.get(URL + `/projects/${projectID}.json`).then( response => {
            const fetchedProject = response.data;
            // Config
            if(!fetchedProject)return;
            if(!fetchedProject.tasks)fetchedProject.tasks = [];
            fetchedProject.editMode = false;
            fetchedProject.tasks.forEach(task => {
                task.highlight = false
            });
            setProject(fetchedProject);
        });
    }, [projectID]);


    // * Actions
    const setDueDate = date => {
        const parseDate = date.toString()
        setProject({...project, due: parseDate});
        axios.patch(URL + `/projects/${project.id}.json`, {due: parseDate});
    };

    const changeProjectName = e => axios.patch(URL + `/projects/${project.id}.json`, {name: e.target.value});

    // * Props
    const TaskListProps = {
        project: project,
        setProject: setProject
    };

    const TaskBubblesProps = {
        project: project,
        setProject: setProject
    };

    return (
        <div className="open_project">
            {/* Top left part of the grid */}
            <ProjectController project={project} changeProjectName={changeProjectName}>
                <ControlPanel 
                    due={project.due}
                    setDueDate = {setDueDate}/>
            </ProjectController>
            {/* Top right part of the grid */}
            <TaskSearch project={project} setProject={setProject}/>
            {/* Bottom left part of the grid */}
            <TaskList {...TaskListProps}/>
            {/* Bottom Right part of the grid */}
            <Bubbles {...TaskBubblesProps}/>
        </div>
    );
}

export default Project