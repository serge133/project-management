import React from 'react';
import nanoid from 'nanoid';
import {
    Wrapper,
    ControlPanel,
    Tasks,
} from '../Components/ProjectTaskList';

import { URL } from '../Config/Database';
import axios from 'axios';

import Sortable from './Sortable';

const TaskList = props => {
    // * Initializer
    const {
    project,
    setProject
    } = props;

    const toggleEditMode = () => {
        const toggle = !project.editMode;
        setProject({...project, editMode: toggle});
    };

    const saveSortableOrder = tasks => {
        setProject({...project, tasks: tasks});
        axios.put(URL + `/projects/${project.id}/tasks.json`, tasks)
    }
    // * Main Actions
    const taskActions = {
        add: (name, tag, importance) => {
            const task = {
                id: nanoid(),
                name: name,
                // X and Y for bubble
                x: 0,
                y: 0,
                importance: importance,
                tag: tag,
                finished: false,
                highlight: false,
            }
            const newTasks = project.tasks.concat([task]);
            setProject({...project, tasks: project.tasks.concat([task])});
            axios.put(URL + `/projects/${project.id}/tasks.json`, newTasks);
        },
        delete: taskID => {
            const copyTasks = [...project.tasks];
            const taskIndex = copyTasks.findIndex( task => task.id === taskID);
            if(taskIndex < 0)return;
            copyTasks.splice(taskIndex, 1);
            setProject({...project, tasks: copyTasks});
            axios.put( URL + `/projects/${project.id}/tasks.json`, copyTasks );
        },
        edit: task => {
            const copyTasks = [...project.tasks];
            const taskID = task.id;
            const taskIndex = copyTasks.findIndex( task => task.id === taskID);
            if(taskIndex < 0)return;
            // The editing on values in the task
            const currentEditTask = copyTasks[taskIndex];
            currentEditTask.name = task.name;
            currentEditTask.tag = task.tag;
            currentEditTask.importance = task.importance
            setProject({...project, tasks: copyTasks});
            axios.put( URL + `/projects/${project.id}/tasks.json`, copyTasks);
        },
        finish: taskID => {
            const copyTasks = [...project.tasks];
            const taskIndex = copyTasks.findIndex( task => task.id === taskID);
            if(taskIndex < 0)return;
            const toggle = !copyTasks[taskIndex].finished;
            copyTasks[taskIndex].finished = toggle;
            setProject({...project, tasks: copyTasks});
            axios.put(URL + `/projects/${project.id}/tasks.json`, copyTasks);
        },
    };

    // * Render
    return (
        <Wrapper>
            <ControlPanel addTask={taskActions.add} toggleEditMode={toggleEditMode}/>
            {project.editMode ? 
            <Tasks 
                tasks={project.tasks}
                taskActions = {taskActions}/>
            : 
            <Sortable setList={saveSortableOrder}>
                { project.tasks }
            </Sortable>
            }
            
        </Wrapper>
    );
};

export default TaskList;