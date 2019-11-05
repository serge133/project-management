import React, { useState } from 'react';

import Popup from './Popup';

import { SwatchesPicker } from 'react-color';

export const Wrapper = ({ children, toggleTagsPopup, toggleAddTag, addTagModeStatus }) => {
    return (
        <Popup close={toggleTagsPopup}>
            { children }
            <section className="popup_control-panel">
                <button onClick={toggleAddTag}>{addTagModeStatus ? 'cancel' : 'Add Tag'}</button>
                <button onClick={toggleTagsPopup}>Ok</button>
            </section>
        </Popup>
    )
}

export const TagsList = ({ tags, selectTag, selectedTag }) => {

    const Tag = ({ tag }) => {
        const { name, color} = tag
        return (
            <li className="tag" 
                style = {selectedTag.color === tag.color ? {borderLeft: `5px solid ${color}`, backgroundColor: 'lightgrey'} : {borderLeft: `5px solid ${color}`}} onClick={() => selectTag(tag)}>
                {name}
            </li>
        )
    }

    return (
        <ul className="tags">
            {tags.map( (tag, index) => <Tag key={index} tag={tag}/>)}
        </ul>
    );
};

export const AddingTag = ({ addTag, toggleAddTag }) => {

    // Default is gray
    const [chosenColor, setChosenColor] = useState('gray');

    const closeAddingTagAndAddTag = () => {
        toggleAddTag();
        addTag(chosenColor);
    }

    return (
        <div>
            <input type="text" id="addTagName" placeholder="Tag Name"/>
            <SwatchesPicker
                onChangeComplete={color => setChosenColor(color.hex)}
                color={chosenColor}/>
            <button onClick={closeAddingTagAndAddTag}>Add</button>
        </div>
    )
}