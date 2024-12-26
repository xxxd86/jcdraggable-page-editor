import React from 'react';

const AvailableComponents = ({ onAddComponent }) => {
  return (
    <div>
      <button onClick={() => onAddComponent('Text')}>Add Text</button>
      <button onClick={() => onAddComponent('Button')}>Add Button</button>
    </div>
  );
};

export default AvailableComponents;
