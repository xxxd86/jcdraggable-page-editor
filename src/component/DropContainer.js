import React from 'react';
import { useDrop } from 'react-dnd';
import ResizableComponent from './ResizableComponent';

const DropContainer = ({
  components,
  onResizeStop,
  onContentChange,
  onModifierChange,
  onMoveComponent,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item) => {
      onMoveComponent(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        minHeight: '400px',
        backgroundColor: canDrop ? (isOver ? 'lightgreen' : 'lightyellow') : 'white',
        border: '2px dashed #ccc',
        padding: '10px',
      }}
    >
      {components.map((comp) => (
        <div
          key={comp.id}
          style={{ padding: '10px', margin: '5px', border: '1px solid #ccc' }}
          onClick={() => onMoveComponent(comp.id)}
        >
          {comp.type === 'row' || comp.type === 'column' ? (
            <div
              style={{
                display: comp.type === 'row' ? 'flex' : 'block',
                flexDirection: comp.type === 'row' ? 'row' : 'column',
                margin: '5px',
                border: '1px dashed #ccc',
              }}
            >
              {comp.children.map((child) => (
                <ResizableComponent
                  key={child.id}
                  id={child.id}
                  type={child.type}
                  content={child.content}
                  modifier={child.modifier}
                  onResizeStop={onResizeStop}
                  onContentChange={onContentChange}
                  onModifierChange={onModifierChange}
                  onMoveComponent={onMoveComponent}
                />
              ))}
            </div>
          ) : (
            <ResizableComponent
              id={comp.id}
              type={comp.type}
              content={comp.content}
              modifier={comp.modifier}
              onResizeStop={onResizeStop}
              onContentChange={onContentChange}
              onModifierChange={onModifierChange}
              onMoveComponent={onMoveComponent}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DropContainer;
