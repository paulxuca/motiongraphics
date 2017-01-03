import React from 'react';
import './styles.scss';

export default ({shapes, currentShapeID, shapeControlsOpen, closeShapeControls, selectShape, changeShapeProp }) => (
  <div className="shapeslist__container">
    {!shapeControlsOpen ?
      <ShapesList
        shapes={shapes}
        selectShape={selectShape}
      /> :
      <ShapeControls
        closeShapeControls={closeShapeControls}
        changeShapeProp={changeShapeProp}
        currentShape={shapes.find(e => e.id === currentShapeID)}
      />
    }
  </div>
);

const ShapesList = ({ shapes, selectShape }) => (
  <ul>
    {shapes.map(e =>
      <li
        key={e.name}
        onClick={() => selectShape(e.id)}
      >
        {e.name}
      </li>
    )}
  </ul>
);

const ShapeControls = ({ currentShape, closeShapeControls, changeShapeProp }) => (
  <div className="shapescontrols__container">
    <h2>
      <span onClick={() => closeShapeControls()}>&lt;</span> {currentShape.name}
    </h2>
    <div className="shapescontrols__inputContainer">
      <input onChange={e => changeShapeProp(currentShape, 'x', e.target.value)} />
    </div>
  </div>
);
