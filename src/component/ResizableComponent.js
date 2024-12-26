import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useDrag } from 'react-dnd';

const ResizableComponent = ({
  id,
  type,
  content,
  modifier,
  onResizeStop,
  onContentChange,
  onModifierChange,
  onMoveComponent,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { id, type, content, modifier },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleResizeStop = (e, data) => {
    const newModifier = {
      ...modifier,
      width: data.size.width,
      height: data.size.height,
    };
    onResizeStop(id, newModifier);
  };

  const handleContentChange = (e) => {
    onContentChange(id, e.target.value);
  };

  return (
    <div
      ref={drag}
      style={{
        padding: modifier.padding,
        backgroundColor: modifier.color,
        width: `${modifier.width}px`,
        height: `${modifier.height}px`,
        cursor: 'move',
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <ResizableBox
        width={modifier.width}
        height={modifier.height}
        minConstraints={[100, 30]}
        maxConstraints={[400, 200]}
        onResizeStop={handleResizeStop}
      >
        <input
          type="text"
          value={content}
          onChange={handleContentChange}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
          }}
        />
      </ResizableBox>
    </div>
  );
};

export default ResizableComponent;
