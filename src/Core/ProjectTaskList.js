import React from 'react';
import nanoid from 'nanoid';
import {
    Wrapper,
    ControlPanel,
    Tasks,
} from '../Components/ProjectTaskList';

import { URL } from '../Config/Database';
import axios from 'axios';
const TaskList = props => {
    const {
    project,
    setProject
    } = props;



    const addTask = color => {
        const taskName = document.getElementById('addTaskName').value;
        const task = {
            id: nanoid(),
            name: taskName,
            // X and Y for bubble
            x: 0,
            y: 0,
            color: color,
            finished: false
        }
        const newTasks = project.tasks.concat([task]);
        setProject({...project, tasks: project.tasks.concat([task])});
        axios.put(URL + `/projects/${project.id}/tasks.json`, newTasks);
    };

    const deleteTask = taskID => {
        const copyTasks = [...project.tasks];
        const taskIndex = copyTasks.findIndex( task => task.id === taskID);
        if(taskIndex < 0)return;
        copyTasks.splice(taskIndex, 1);
        setProject({...project, tasks: copyTasks});
        axios.put( URL + `/projects/${project.id}/tasks.json`, copyTasks );
    };

    const editTask = task => {
        const taskID = task.id;
        const copyTasks = [...project.tasks];
        const taskIndex = copyTasks.findIndex( task => task.id === taskID);
        if(taskIndex < 0)return;
        // The editing on values in the task
        const newTaskName = document.getElementById('editTaskName').value;
        const newTaskColor = task.color;
        const currentEditTask = copyTasks[taskIndex];
        currentEditTask.name = newTaskName;
        currentEditTask.color = newTaskColor;
        setProject({...project, tasks: copyTasks});
        axios.put( URL + `/projects/${project.id}/tasks.json`, copyTasks);
    };

    return (
        <Wrapper>
            <ControlPanel addTask={addTask}/>
            <Tasks 
                tasks={project.tasks}
                deleteTask={deleteTask}
                editTask={editTask}/>
        </Wrapper>
    );
};

export default TaskList;