import React, { useState, Fragment } from "react";

import Popup from "./Popup";
import Tags from "../Core/Tags";

export const Wrapper = ({ children }) => {
  return <section className="task_list">{children}</section>;
};

export const ControlPanel = ({ addTask, toggleEditMode }) => {
  const [addTaskPopup, setAddTaskPopup] = useState({
    show: false,

    name: "",
    // Size varies between two and three
    importance: 2,
    //default color
    tag: { name: "Default", color: "gray" }
  });
  const [tagsPopup, setTagsPopup] = useState(false);
  const toggleAddTaskPopup = () =>
    setAddTaskPopup({ ...addTaskPopup, show: !addTaskPopup.show });
  const toggleTagsPopup = () => setTagsPopup(!tagsPopup);
  const closePopupAndAddTask = () => {
    toggleAddTaskPopup();
    addTask(addTaskPopup.name, addTaskPopup.tag, addTaskPopup.importance);
  };

  const popups = () => {
    if (addTaskPopup.show && !tagsPopup) {
      return (
        <Popup close={toggleAddTaskPopup}>
          <input
            type="text"
            onChange={e =>
              setAddTaskPopup({ ...addTaskPopup, name: e.target.value })
            }
            placeholder="Task Name"
            value={addTaskPopup.name}
          />
          <div
            className="selected_tag"
            style={{ border: `3px solid ${addTaskPopup.tag.color}` }}
            onClick={toggleTagsPopup}
          >
            {addTaskPopup.tag.name}
          </div>
          <h2>Importance:</h2>
          <input
            type="range"
            min="1"
            max="3"
            value={addTaskPopup.importance}
            onChange={e =>
              setAddTaskPopup({
                ...addTaskPopup,
                importance: e.target.valueAsNumber
              })
            }
          />
          <section className="popup_control-panel">
            <button onClick={closePopupAndAddTask}>Submit</button>
          </section>
        </Popup>
      );
    } else if (addTaskPopup.show && tagsPopup) {
      return (
        <Tags
          selectTag={tag => setAddTaskPopup({ ...addTaskPopup, tag: tag })}
          toggleTagsPopup={toggleTagsPopup}
          selectedTag={addTaskPopup.tag}
        />
      );
    } else return null;
  };

  return (
    <Fragment>
      {popups()}
      <div className="control_panel">
        <button onClick={toggleAddTaskPopup}>New Task</button>
        <label className="switch">
          <input type="checkbox" onChange={toggleEditMode} />
          <span></span>
        </label>
      </div>
    </Fragment>
  );
};

export const Tasks = ({ tasks, taskActions }) => {
  // Editing requires a todo to be stored
  const [editTaskPopup, setEditTaskPopup] = useState({
    show: false,
    task: {
      id: "",
      name: "",
      importance: 2,
      tag: { name: "", color: "" }
    }
  });

  const [tagsPopup, setTagsPopup] = useState(false);

  // Sets the task when opening edit popup
  const openEditPopup = task => setEditTaskPopup({ show: true, task: task });
  const closeEditPopup = () =>
    setEditTaskPopup({ ...editTaskPopup, show: false });
  const toggleTagsPopup = () => setTagsPopup(!tagsPopup);
  const closePopupAndEditTask = () => {
    closeEditPopup();
    taskActions.edit(editTaskPopup.task);
  };

  const popups = () => {
    if (editTaskPopup.show && !tagsPopup) {
      return (
        <Popup close={closeEditPopup}>
          <h1>Task</h1>
          <input
            type="text"
            onChange={e =>
              setEditTaskPopup({
                ...editTaskPopup,
                task: { ...editTaskPopup.task, name: e.target.value }
              })
            }
            value={editTaskPopup.task.name}
          />
          <div
            className="selected_tag"
            style={{ border: `3px solid ${editTaskPopup.task.tag.color}` }}
            onClick={toggleTagsPopup}
          >
            {editTaskPopup.task.tag.name}
          </div>
          <h2>Importance</h2>
          <input
            type="range"
            value={editTaskPopup.task.importance}
            min="1"
            max="3"
            onChange={e =>
              setEditTaskPopup({
                show: true,
                task: {
                  ...editTaskPopup.task,
                  importance: e.target.valueAsNumber
                }
              })
            }
          />
          <section className="popup_control-panel">
            <button onClick={closePopupAndEditTask}>Submit</button>
          </section>
        </Popup>
      );
    } else if (editTaskPopup.show && tagsPopup) {
      return (
        <Tags
          selectTag={tag =>
            setEditTaskPopup({
              ...editTaskPopup,
              task: { ...editTaskPopup.task, tag: tag }
            })
          }
          selectedTag={editTaskPopup.task.tag}
          toggleTagsPopup={toggleTagsPopup}
        />
      );
    } else return null;
  };
  // ! In Development [ Sortable List ]
  const Task = ({ task }) => {
    const { id, name, finished, highlight, tag } = task;
    const [expand, setExpand] = useState(false);

    const toggleExpand = () => setExpand(!expand);

    const TaskControlPanel = () => {
      return (
        <section className="task_control-panel">
          <button onClick={() => taskActions.delete(id)}>Delete</button>
          <button onClick={() => openEditPopup(task)}>Edit</button>
          <button onClick={toggleExpand}>{expand ? "Close" : "Open"}</button>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => taskActions.finish(id)}
          >
            {finished ? "Finished" : "Finish"}
          </button>
        </section>
      );
    };

    const taskNameStyle = {
      textDecoration: finished ? "line-through" : null
    };
    const taskStyle = {
      opacity: finished ? 0.5 : 1,
      border: highlight ? "5px solid #5f5ff0" : null,
      borderLeft: `7px solid ${tag.color}`
    };
    const truncateName =
      name.length > 60 ? name.substring(0, 60) + "..." : name;
    // ! In Development
    const sortableProps = {
      setList: null
    };

    return (
      <li
        key={id}
        className={expand ? "expand_task" : "task"}
        style={taskStyle}
      >
        <h1 className="name" style={taskNameStyle}>
          {truncateName}
        </h1>
        <h6>{tag.name}</h6>
        <TaskControlPanel />
      </li>
    );
  };

  return (
    <ul className="tasks">
      {popups()}
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};
