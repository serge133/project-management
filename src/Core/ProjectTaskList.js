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


    const addTask = (name, tag, importance) => {
        const task = {
            id: nanoid(),
            name: name,
            // X and Y for bubble
            x: 0,
            y: 0,
            importance: importance,
            tag: tag,
            finished: false,
            highlight: false
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
    };

    const finishTask = taskID => {
        const copyTasks = [...project.tasks];
        const taskIndex = copyTasks.findIndex( task => task.id === taskID);
        if(taskIndex < 0)return;
        const toggle = !copyTasks[taskIndex].finished;
        copyTasks[taskIndex].finished = toggle;
        setProject({...project, tasks: copyTasks});
        axios.put(URL + `/projects/${project.id}/tasks.json`, copyTasks);
    }

    return (
        <Wrapper>
            <ControlPanel addTask={addTask}/>
            <Tasks 
                tasks={project.tasks}
                deleteTask={deleteTask}
                editTask={editTask}
                finishTask={finishTask}/>
        </Wrapper>
    );
};

export default TaskList;