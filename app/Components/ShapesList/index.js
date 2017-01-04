import React, { Component } from 'react';
import { getCurrentShape } from '../../Containers/Editor/utils';
import ShapeControls from './ShapesControl';
import ShapesList from './ShapesList';
import './styles.scss';

export default ({shapes, currentShapeID, shapeControlsOpen, closeShapeControls, selectShape, changeShapeProp }) => {
  return (
      <div className="shapeslist__container">
        {!shapeControlsOpen ?
          <ShapesList
            shapes={shapes}
            selectShape={selectShape}
          /> :
          <ShapeControls
            closeShapeControls={closeShapeControls}
            changeShapeProp={changeShapeProp}
            currentShapeID={currentShapeID}
            currentShape={getCurrentShape(shapes, currentShapeID)}
          />
        }
      </div>
    );
};