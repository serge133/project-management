import React from 'react';

export const Wrapper = ({ children }) => {
    return (
        <section className="task_search">
            { children }
        </section>
    )
}

export const SearchBar = ({ filterTasks }) => <input type = "text" placeholder="Search for any task..." onChange={filterTasks}/>;


export const SearchResults = ({ tasks, selectTask }) => {

    const Task = ({ task }) => {
        return (
            <li onClick={() => selectTask(task.id)} id={task.id}>
                {task.name}
            </li>
        )
    };

    return (
        <ul className="search_results">
            {tasks.map( task => <Task key ={task.id} task = {task}/>)}
        </ul>
    )
}