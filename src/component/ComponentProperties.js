import React from 'react';

const ComponentProperties = ({
  component,
  onContentChange,
  onModifierChange,
  onAddChild,
}) => {
  if (!component) return null;

  const handleContentChange = (e) => {
    onContentChange(component.id, e.target.value);
  };

  const handleAddChild = (childType) => {
    onAddChild(component.id, childType);
  };

  return (
    <div>
      <h4>{component.type} Properties</h4>
      <div>
        <label>Content:</label>
        <input
          type="text"
          value={component.content}
          onChange={handleContentChange}
        />
      </div>

      <div>
        <label>Width:</label>
        <input
          type="number"
          value={component.modifier.width}
          onChange={(e) =>
            onModifierChange(component.id, {
              ...component.modifier,
              width: parseInt(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label>Height:</label>
        <input
          type="number"
          value={component.modifier.height}
          onChange={(e) =>
            onModifierChange(component.id, {
              ...component.modifier,
              height: parseInt(e.target.value),
            })
          }
        />
      </div>

      {/* For Row and Column, allow adding child components */}
      {component.type === 'row' || component.type === 'column' ? (
        <div>
          <button onClick={() => handleAddChild('Text')}>Add Text</button>
          <button onClick={() => handleAddChild('View')}>Add View</button>
        </div>
      ) : null}
    </div>
  );
};

export default ComponentProperties;
