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

const Project = ({ match }) => {
    const { projectID } = match.params;

    const [project, setProject] = useState({
        id: '',
        name: '',
        description: '',
        // default date
        due: new Date(),
        tasks: []
    });

    useEffect(() => {
        axios.get(URL + `/projects/${projectID}.json`).then( response => {
            const fetchedProject = response.data;
            // Config
            if(!fetchedProject)return;
            if(!fetchedProject.tasks)fetchedProject.tasks = [];
            setProject(fetchedProject);
        });
    }, [projectID]);

    const setDueDate = date => {
        const parseDate = date.toString()
        setProject({...project, due: parseDate});
        axios.patch(URL + `/projects/${project.id}.json`, {due: parseDate});
    };

    const TaskListProps = {
        project: project,
        setProject: setProject
    }

    const TaskBubblesProps = {
        project: project,
        setProject: setProject
    }
    return (
        <div className="open_project">
            {/* Top left part of the grid */}
            <ProjectController project={project}>
                <ControlPanel 
                    due={project.due}
                    setDueDate = {setDueDate}/>
            </ProjectController>
            <section className="task">

            </section>
            {/* Bottom left part of the grid */}
            <TaskList {...TaskListProps}/>
            <Bubbles {...TaskBubblesProps}/>
        </div>
    );
}

export default Project