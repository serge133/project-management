import React, { useState, Fragment } from 'react';


import Popup from './Popup';
import { SwatchesPicker } from 'react-color';

export const Wrapper = ({ children }) => {
    return (
        <section className="task_list">
            { children }
        </section>
    );
};

export const ControlPanel = ({ addTask }) => {
    const [addTaskPopup, setAddTaskPopup] = useState({
        show: false,
        //default color
        color: 'gray'
    });
    
    const togglePopup = () => setAddTaskPopup({show: !addTaskPopup.show, color: 'gray'});

    const closePopupAndAddTask = () => {
        togglePopup();
        addTask(addTaskPopup.color);
    };

    const AddTaskPopup = (
        <Popup close={togglePopup}>
            <input type="text" id="addTaskName" placeholder="Task Name"/>
            <SwatchesPicker
                onChangeComplete={color => setAddTaskPopup({show: true, color: color.hex})}
                color={addTaskPopup.color}/>
            <section className="popup_control-panel">
                <button onClick={closePopupAndAddTask}>Submit</button>
            </section>
        </Popup>
    )

    return (
        <Fragment>
            {addTaskPopup.show ? AddTaskPopup : null}
            <div className="control_panel">
                <button onClick={togglePopup}>New Task</button>
            </div>
        </Fragment>
    )
}

export const Tasks = ({ tasks, deleteTask, editTask }) => {
    // Editing requires a todo to be stored
    const [editTaskPopup, setEditTaskPopup] = useState({
        show: false,
        task: {
            id: '',
            name: '',
            color: ''
        }
    });

    const openEditPopup = task => setEditTaskPopup({show: true, task: task});
    const closeEditPopup = () => setEditTaskPopup({...editTaskPopup, show: false});
    const closePopupAndEditTask = () => {
        closeEditPopup()
        editTask(editTaskPopup.task);
    };

    const setEditColor = color => setEditTaskPopup({...editTaskPopup, task: {...editTaskPopup.task, color: color.hex}})
    const EditTaskPopup = (
        <Popup close={closeEditPopup}>
            <h1>Task</h1>
            <input type="text" id="editTaskName" defaultValue={editTaskPopup.task.name}/>
            <SwatchesPicker 
                onChangeComplete={setEditColor}
                color={editTaskPopup.task.color}/>
            <section className="popup_control-panel">
                <button onClick={closePopupAndEditTask}>Submit</button>
            </section>
        </Popup>
    );

    const TaskControlPanel = ({ task }) => {
        return (
            <section className="task_control-panel">
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => openEditPopup(task)}>Edit</button>
            </section>
        );
    };
    
    return (
        <ul className="tasks">
            {editTaskPopup.show ? EditTaskPopup : null}
            {tasks.map( task => (
                <li key={task.id} className="task" style={{border: `1px solid ${task.color}`}}>
                    <h1 className="name">{task.name.substring(0, 60)} {task.name.length > 60 ? '...': null}</h1>
                    <TaskControlPanel task={task}/>
                </li>
            ))}
        </ul>
    );
}

