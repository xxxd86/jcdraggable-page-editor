// DraggableComponent.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ id, type, content, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { id, type, content },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        margin: '10px',
        backgroundColor: isDragging ? 'lightgray' : 'white',
        border: '1px solid #ccc',
        cursor: 'move',
      }}
    >
      {content}
    </div>
  );
};

export default DraggableComponent;
