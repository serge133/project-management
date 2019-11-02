import React, { Fragment } from 'react';
import Draggable from 'react-draggable';


export const Wrapper = ({ children }) => {
    return (
        <section className="bubbles">
            { children }
        </section>
    );
};

export const Bubbles = ({ bubbles, savePosition }) => {
    

    const Bubble = ({ bubble }) => {
        return (
            <Draggable
                bounds="parent"
                onStop={(e, data) => savePosition(e, data, bubble.id)}
                defaultPosition={{x: 0, y: 0}}
                position={{x: bubble.x, y: bubble.y}}>
                <div className="bubble" style={{backgroundColor: bubble.color}}>
                    <h3 className="name">{bubble.name.substring(0, 25)} {bubble.name.length > 25 ? '...': null}</h3>
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