import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//// const initial = [{id: 'fasdfasd', content: 'test'}, {id: 'dafdsf', content: 'another test'}]


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Item = ({ item, index }) => {
  const itemColorStyle = {
    width: 15,
    height: 15,
    borderRadius: '100%',
    border: `3px solid ${item.tag.color}`,
    backgroundColor: item.finished ? item.tag.color : null,
    position: 'absolute',
    right: 5,

  }

  return (
    <Draggable draggableId={item.id} index={index}>
      {provided => (
        <div
            className="sortable_list-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // ? Style is very slow
        >
            <div style={itemColorStyle}/>
            <h2 style={item.highlight ? {color: '#7a7af0'} : {color: 'white'}}>{item.name}</h2>
            <br/>
            <h3>{item.tag.name}</h3>
            
        </div>
      )}
    </Draggable>
  );
}

const List = React.memo(function List({ items }) {
  return items.map((item, index) => (
    <Item item={item} index={index} key={item.id} />
  ));
});


const Sortable = props => {

// * Children is list
  const {
    children,
    setList
  } = props;

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      children,
      result.source.index,
      result.destination.index
    );

    // setState({ items });
    setList(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="sortable_list">
            <List items={children} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Sortable;