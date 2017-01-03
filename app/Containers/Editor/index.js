import React, { Component } from 'react';
import mojs from 'mo-js';

import { CLICKABLE } from '../../Motion/constants';
import ShapesList from '../../Components/ShapesList';
import Player from '../../Components/Player';
import Controls from '../../Components/Controls';

import { getShapeID, getExistingShapes } from './utils';
import './styles.scss';

class Editor extends Component {
  state = {    
    currentSelectedShape: false,
    controlsOpen: false,
    shapeControlsOpen: false,
    shapesOnBoard: [],
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyListener);
    window.addEventListener('click', this.mousedownListener);
  }

  keyListener = (e) => {
    if (e.keyCode === 67) {
      this.setState({ controlsOpen: !this.state.controlsOpen });
    }
  }

  mousedownListener = (e) => {
    if (CLICKABLE.indexOf(e.target.nodeName) !== -1) {
      const shapeID = getShapeID(e);
      this.selectShape(shapeID);
    }
    this.closeControls();
  }

  addShape = (shape, shapename) => {
    
    const shapeNumber = getExistingShapes(this.state.shapesOnBoard, shape);
    const sID = `${shape}_${shapeNumber}`;
    const sName = `${shapename} ${shapeNumber}`;

    const newShape = new mojs.Shape({
      shape,
      className: sID,
      isShowStart: true,
      parent: '#shapes_parent',
    });

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