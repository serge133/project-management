import React, { useState } from 'react';

import {
Wrapper,
SearchBar,
SearchResults
} from '../Components/TaskSearch';

// !Work in progress
const TaskSearch = props => {
    const {
    project,
    setProject
    } = props;

    const [filteredTasks, setFilteredTasks] = useState([]);

    const clearHighlightsAndFilter = () => {
        const copyTasks = [...project.tasks];
        copyTasks.forEach(task => task.highlight = false);
        setProject({...project, tasks: copyTasks});
        setFilteredTasks([])
    }

    const filterTasks = e => {
        const searchField = e.target.value;
        const taskFilter = project.tasks.filter( task => task.name.toLowerCase().includes(searchField.toLowerCase()));
        
        setFilteredTasks(taskFilter);
        if(searchField.length === 0){
            clearHighlightsAndFilter()
        }
    };

    const highlightTask = taskID => {
        const copyTasks = [...project.tasks];
        const taskIndex = copyTasks.findIndex(task => task.id === taskID);
        console.log('clicked')
        if(taskIndex < 0)return;
        copyTasks[taskIndex].highlight = true;
        setProject({...project, tasks: copyTasks});
    }

    return (
        <Wrapper>
            <SearchBar filterTasks={filterTasks}/>
            <SearchResults tasks={filteredTasks} selectTask={highlightTask}/>
        </Wrapper>
            
        
    );
}

export default TaskSearch;