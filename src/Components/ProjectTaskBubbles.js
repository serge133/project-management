import React, { Fragment, useState } from "react";
import Draggable from "react-draggable";

import Tooltip from "./Tooltip";

export const Wrapper = ({ children }) => {
  return <section className="bubbles">{children}</section>;
};

export const Bubbles = ({ bubbles, savePosition }) => {
  // A BUBBLE IS A TASK JUST SAYING!!!
  const Bubble = ({ bubble }) => {
    const { name, tag, importance, id, x, y, finished, highlight } = bubble;
    const [showTooltip, setShowTooltip] = useState(false);

    const bubbleDiameter = importance * 50;

    const bubbleStyle = {
      backgroundColor: tag.color,
      width: bubbleDiameter,
      height: bubbleDiameter,
      opacity: finished ? 0.3 : 1,
      border: highlight ? "5px solid #5f5ff0" : null
    };
    return (
      <Draggable
        bounds="parent"
        onStop={(e, data) => savePosition(e, data, id)}
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: x, y: y }}
      >
        <div
          className="bubble"
          style={bubbleStyle}
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Tooltip show={showTooltip} top={bubbleDiameter} left={null}>
            {name}
          </Tooltip>
        </div>
      </Draggable>
    );
  };

  return (
    <Fragment>
      {bubbles.map(bubble => (
        <Bubble key={bubble.id} bubble={bubble} />
      ))}
    </Fragment>
  );
};
