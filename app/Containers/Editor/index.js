import React, { Component } from 'react';
import mojs from 'mo-js';

import { CLICKABLE } from '../../Motion/constants';
import ShapesList from '../../Components/ShapesList';
import Player from '../../Components/Player';
import Controls from '../../Components/Controls';

import {
  getShapeID,
  getExistingShapes,
  debounce,
  getCurrentShape,
} from './utils';
import './styles.scss';

class Editor extends Component {
  state = {    
    currentSelectedShape: false,
    controlsOpen: false,
    shapeControlsOpen: false,
    shapesOnBoard: [],
  }

  componentDidMount() {
    this.dragFlag = 0;
    this.timeline = new mojs.Timeline();
    this.changeShapeProp = debounce(this.changeShapeProp, 200);

    window.addEventListener('keydown', this.keyListener);
    window.addEventListener('mousedown', this.mousedownListener);
    window.addEventListener('mousemove', this.mousedragListener);
    window.addEventListener('mouseup', this.mouseupListener);
    
    window.addEventListener('click', this.mousedownListener);
  }

  keyListener = (e) => {
    if (e.keyCode === 67) {
      this.setState({ controlsOpen: !this.state.controlsOpen });
    }
  }

  mouseupListener = (e) => {
    if (this.dragFlag === 0) {
      if (CLICKABLE.indexOf(e.target.nodeName) !== -1) {
        const shapeID = getShapeID(e);
        this.selectShape(shapeID);
      }
      this.closeControls();
    }
  };

  mousedownListener = (e) => {
    this.dragFlag = 0;
  };

  mousedragListener = (e) => {
    this.dragFlag = 1;
  };

  addShape = (shape, shapename) => {
    const shapeNumber = getExistingShapes(this.state.shapesOnBoard, shape);
    const sID = `${shape}_${shapeNumber}`;
    const sName = `${shapename} ${shapeNumber}`;

    const newShape = new mojs.Shape({
      shape,
      className: sID,
      isShowStart: true,
      parent: document.getElementById('shapes_parent'),
    });


    this.timeline.append(newShape);
    this.setState({
      shapesOnBoard: this.state.shapesOnBoard.concat({
        name: sName,
        id: sID,
        shape: newShape,
        type: shape,
      }),
    });
  }

  changeShapeProp = ({ shape }, field, newValue) => shape.tune({ [field]: newValue }).replay();
  closeControls = () => this.setState({ controlsOpen: false });
  openShapeControls = () => this.setState({ shapeControlsOpen: true });
  closeShapeControls = () => this.setState({ shapeControlsOpen: false});
  selectShape = (shapeID) => this.setState({
    currentSelectedShape: shapeID,
    shapeControlsOpen: true,
  });

  renderShapesList() {
    return (
      <ShapesList
        shapeControlsOpen={this.state.shapeControlsOpen}
        currentShapeID={this.state.currentSelectedShape}
        shapes={this.state.shapesOnBoard}
        closeShapeControls={this.closeShapeControls}
        changeValue={this.changeShapeProp}
        selectShape={this.selectShape}
        changeShapeProp={this.changeShapeProp}
      />
    );
  }

  render() {
    return (
      <div className="editor__container">
        <Controls
          addShape={this.addShape}
          isOpen={this.state.controlsOpen}
        />
        <Player />
        {this.renderShapesList()}
      </div>
    );
  }
}

export default Editor;