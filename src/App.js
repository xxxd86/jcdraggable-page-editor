import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropContainer from './component/DropContainer';
import AvailableComponents from './component/AvailableComponents';
import ComponentProperties from './component/ComponentProperties';

const App = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  // 添加新的组件（如文本组件、视图组件等）
  const handleAddComponent = (type) => {
    const newId = `${components.length + 1}`;
    const newComponent = {
      id: newId,
      type,
      content: `${type} Component`,
      modifier: {
        width: 200,
        height: 100,
        padding: 16,
        color: '#FF0000',
      },
      children: [],
    };
    setComponents([...components, newComponent]);
  };

  // 动态添加 Row
  const handleAddRow = () => {
    const newId = `row-${components.length + 1}`;
    const newRow = {
      id: newId,
      type: 'row',
      content: 'Row',
      modifier: {
        width: 400,
        height: 200,
        padding: 16,
        color: '#FFFF00',
      },
      children: [],
    };
    setComponents([...components, newRow]);
  };

  // 动态添加 Column
  const handleAddColumn = () => {
    const newId = `col-${components.length + 1}`;
    const newColumn = {
      id: newId,
      type: 'column',
      content: 'Column',
      modifier: {
        width: 200,
        height: 200,
        padding: 16,
        color: '#00FF00',
      },
      children: [],
    };
    setComponents([...components, newColumn]);
  };

  // 为 Row 或 Column 添加子组件（Text 或 View）
  const handleAddChildToContainer = (containerId, childType) => {
    const newChild = {
      id: `${containerId}-child-${Date.now()}`,
      type: childType,
      content: `${childType} Component`,
      modifier: {
        width: 100,
        height: 50,
        padding: 8,
        color: '#FF6600',
      },
      children: [],
    };

    setComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === containerId
          ? { ...comp, children: [...comp.children, newChild] }
          : comp
      )
    );
  };

  // 修改组件的尺寸
  const handleResizeStop = (id, newModifier) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, modifier: newModifier } : comp
      )
    );
  };

  // 修改组件的内容
  const handleContentChange = (id, newContent) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, content: newContent } : comp
      )
    );
  };

  // 修改组件的样式
  const handleModifierChange = (id, newModifier) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, modifier: newModifier } : comp
      )
    );
  };

  // 选中组件
  const handleSelectComponent = (id) => {
    setSelectedComponent(id);
  };

  // 删除组件
  const handleDeleteComponent = (id) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  // 导出 JSON 数据
  const handleExport = () => {
    const jsonBlob = new Blob([JSON.stringify({ elements: components }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-layout.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* 左侧区域：组件库 */}
        <div style={{ width: '25%', padding: '10px', borderRight: '2px solid #ccc' }}>
          <h3>Available Components</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <AvailableComponents onAddComponent={handleAddComponent} />
        </div>

        {/* 中间区域：页面编辑区 */}
        <div
          style={{
            flex: 1,
            padding: '10px',
            overflowY: 'auto',
            borderRight: '2px solid #ccc',
          }}
        >
          <h3>Page Editor</h3>
          <DropContainer
            components={components}
            onResizeStop={handleResizeStop}
            onContentChange={handleContentChange}
            onModifierChange={handleModifierChange}
            onMoveComponent={handleSelectComponent}
          />
        </div>

        {/* 右侧区域：组件属性编辑区 */}
        <div style={{ width: '25%', padding: '10px' }}>
          <h3>Component Properties</h3>
          {selectedComponent && (
            <ComponentProperties
              component={components.find((comp) => comp.id === selectedComponent)}
              onContentChange={handleContentChange}
              onModifierChange={handleModifierChange}
              onAddChild={handleAddChildToContainer}
              onDelete={handleDeleteComponent}
            />
          )}
        </div>
      </div>

      {/* 导出按钮 */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button onClick={handleExport} style={{ padding: '10px 20px' }}>
          Export JSON
        </button>
      </div>
    </DndProvider>
  );
};

export default App;
