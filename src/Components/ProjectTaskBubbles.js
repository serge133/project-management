import React, { Fragment, useState } from 'react';
import Draggable from 'react-draggable';

import Tooltip from './Tooltip';

export const Wrapper = ({ children }) => {
    return (
        <section className="bubbles">
            { children }
        </section>
    );
};

export const Bubbles = ({ bubbles, savePosition }) => {
    

    const Bubble = ({ bubble }) => {
        const {name, tag, importance, id, x, y} = bubble;
        const bubbleSize = importance * 100;
        const [showTooltip, setShowTooltip] = useState(false);
        return (
            <Draggable
                bounds="parent"
                onStop={(e, data) => savePosition(e, data, id)}
                defaultPosition={{x: 0, y: 0}}
                position={{x: x, y: y}}>
                <div className="bubble" 
                    style={{backgroundColor: tag.color, width: bubbleSize, height: bubbleSize}}
                    onMouseOver={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}>
                    <Tooltip show={showTooltip} top={bubbleSize} left={null}>
                        {name}
                    </Tooltip>
                </div>
            </Draggable>
        );
    }

    return (
        <Fragment>
            {bubbles.map( bubble => <Bubble key={bubble.id} bubble={bubble}/>)}
        </Fragment>
    );
}