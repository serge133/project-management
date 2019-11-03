import React, { useState, Fragment } from 'react';


import Popup from './Popup';
import Tags from '../Core/Tags';

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
        
        name: '',
        // Size varies between two and three
        importance: 2,
        //default color
        tag: {name: 'Default', color: 'gray'}
    });
    const [tagsPopup, setTagsPopup] = useState(false);
    const toggleAddTaskPopup = () => setAddTaskPopup({...addTaskPopup,show: !addTaskPopup.show});
    const toggleTagsPopup = () => setTagsPopup(!tagsPopup);
    const closePopupAndAddTask = () => {
        toggleAddTaskPopup();
        addTask(addTaskPopup.name, addTaskPopup.tag, addTaskPopup.importance);
    };

    const popups = () => {
        if(addTaskPopup.show && !tagsPopup){
            return (
                <Popup close={toggleAddTaskPopup}>
                    <input type="text" onChange={e => setAddTaskPopup({...addTaskPopup, name: e.target.value})} placeholder="Task Name" value={addTaskPopup.name}/>
                    <div className="selected_tag" style={{border: `3px solid ${addTaskPopup.tag.color}`}}>
                        {addTaskPopup.tag.name}
                    </div>
                    <button onClick={toggleTagsPopup}>Select Tag</button>
                    <h2>Importance:</h2>
                    <input type="range" min="1" max="3" value={addTaskPopup.importance} onChange={e => setAddTaskPopup({...addTaskPopup, importance: e.target.valueAsNumber})}/>
                    <section className="popup_control-panel">
                        <button onClick={closePopupAndAddTask}>Submit</button>
                    </section>
                </Popup>
            );
        } else if (addTaskPopup.show && tagsPopup) {
            return <Tags 
                        selectTag={tag => setAddTaskPopup({...addTaskPopup, tag: tag})} 
                        toggleTagsPopup={toggleTagsPopup}
                        selectedTag={addTaskPopup.tag}/>
        } else return null;
    };
    
    return (
        <Fragment>
            {popups()}
            <div className="control_panel">
                <button onClick={toggleAddTaskPopup}>New Task</button>
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
            importance: 2,
            tag: {name: '', color: ''}
        }
    });

    const [tagsPopup, setTagsPopup] = useState(false);

    // Sets the task when opening edit popup
    const openEditPopup = task => setEditTaskPopup({show: true, task: task});
    const closeEditPopup = () => setEditTaskPopup({...editTaskPopup, show: false});
    const toggleTagsPopup = () => setTagsPopup(!tagsPopup);
    const closePopupAndEditTask = () => {
        closeEditPopup()
        editTask(editTaskPopup.task);
    };

    const popups = () => {
        if(editTaskPopup.show && !tagsPopup){
            return (
                <Popup close={closeEditPopup}>
                    <h1>Task</h1>
                    <input type="text" onChange={e => setEditTaskPopup({...editTaskPopup, task: {...editTaskPopup.task, name: e.target.value}})} value={editTaskPopup.task.name}/>
                    <div className="selected_tag" style={{border: `3px solid ${editTaskPopup.task.tag.color}`}}>
                        {editTaskPopup.task.tag.name}
                    </div>
                    <button onClick={toggleTagsPopup}>Select Tag</button>
                    <h2>Importance</h2>
                    <input type = "range" value ={editTaskPopup.task.importance} min="1" max="3" onChange={e => setEditTaskPopup({show: true, task: {...editTaskPopup.task, importance: e.target.valueAsNumber}})}/>
                    <section className="popup_control-panel">
                        <button onClick={closePopupAndEditTask}>Submit</button>
                    </section>
                </Popup>
            )
        } else if (editTaskPopup.show && tagsPopup){
            return <Tags 
                        selectTag={tag => setEditTaskPopup({...editTaskPopup, task: {...editTaskPopup.task, tag: tag}})}
                        selectedTag={editTaskPopup.task.tag}
                        toggleTagsPopup={toggleTagsPopup}/>
        } else return null;
    }


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
            {popups()}
            {tasks.map( task => (
                <li key={task.id} className="task" style={{border: `1px solid ${task.tag.color}`}}>
                    <h1 className="name">{task.name.substring(0, 60)} {task.name.length > 60 ? '...': null}</h1>
                    <h6>{task.tag.name}</h6>
                    <TaskControlPanel task={task}/>
                </li>
            ))}
        </ul>
    );
}

