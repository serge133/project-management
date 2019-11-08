import React from "react";
import {
  Wrapper,
  Bubbles as BubblesComponent
} from "../Components/ProjectTaskBubbles";
import axios from "axios";
import { URL } from "../Config/Database";

const Bubbles = props => {
  const { project, setProject } = props;

  // React Draggable
  const savePosition = (e, data, bubbleID) => {
    const x = data.x;
    const y = data.y;
    const copyTasks = [...project.tasks];
    const bubbleIndex = copyTasks.findIndex(bubble => bubble.id === bubbleID);
    if (bubbleIndex < 0) return;
    copyTasks[bubbleIndex].x = x;
    copyTasks[bubbleIndex].y = y;
    setProject({ ...project, tasks: copyTasks });
    axios.put(URL + `/projects/${project.id}/tasks.json`, copyTasks);
  };

  return (
    <Wrapper>
      <BubblesComponent bubbles={project.tasks} savePosition={savePosition} />
    </Wrapper>
  );
};

export default Bubbles;
