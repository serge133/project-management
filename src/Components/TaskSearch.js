import React from "react";
import searchSVG from "../assets/search.svg";

export const Wrapper = ({ children }) => {
  return <section className="top_right">{children}</section>;
};

export const SearchBar = ({ filterTasks }) => {
  return (
    <section className="task_search">
      <input
        type="text"
        placeholder="Search for any task..."
        onChange={filterTasks}
      />
      <img alt="search" src={searchSVG} className="search_icon" />
    </section>
  );
};

export const SearchResults = ({ tasks, selectTask }) => {
  const Task = ({ task }) => {
    return (
      <li onClick={() => selectTask(task.id)} id={task.id}>
        {task.name}
      </li>
    );
  };

  return (
    <ul className="search_results">
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};
