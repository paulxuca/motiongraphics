import React, { Component } from 'react';
import { getShapeValues } from '../../Containers/Editor/utils';


export default class ShapesControl extends Component {
  constructor(props) {
    super();
    this.state = {
      ...getShapeValues(props.currentShape)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentShapeID !== this.props.currentShapeID) {
      this.setState({
        ...getShapeValues(nextProps.currentShape),
      });
    }
  }

  onChangeValue = (prop, value) => {
    this.setState({
      [prop]: value,
    });
    this.props.changeShapeProp(this.props.currentShape, prop, value);
  }

  render() {
    const { currentShape, changeShapeProp, closeShapeControls } = this.props;

    return (
      <div className="shapescontrols__container">
        <h2>
          <span onClick={() => closeShapeControls()}>&lt;</span> {this.props.currentShape.name}
        </h2>
        <div className="shapescontrols__inputContainer">
          <h4 className="shapescontrols__inputContainerHeader">Position</h4>
          {generateForm({
            fieldname: 'x',
            fielddisplay: 'X',
            value: this.state.x,
            onChange: e => this.onChangeValue('x', e.target.value)
          })}
          {generateForm({
            fieldname: 'y',
            fielddisplay: 'Y',
            value: this.state.y,
            onChange: e => this.onChangeValue('y', e.target.value)
          })}
          <h4 className="shapescontrols__inputContainerHeader">Stroke</h4>
          {generateForm({
            fieldname: 'stroke',
            fielddisplay: 'Stroke Color',
            value: this.state.stroke,          
            onChange: e => this.onChangeValue('stroke', e.target.value)
          })}
          {generateForm({
            fieldname: 'strokeOpacity',
            fielddisplay: 'Stroke Opacity',
            value: this.state.strokeOpacity,          
            onChange: e => this.onChangeValue('strokeOpacity', e.target.value),        
          })}
          <h4 className="shapescontrols__inputContainerHeader">Fill</h4>
          {generateForm({
            fieldname: 'fill',
            fielddisplay: 'Shape Fill',
            value: this.state.fill,          
            onChange: e => this.onChangeValue('fill', e.target.value)
          })}
          {generateForm({
            fieldname: 'fillOpacity',
            fielddisplay: 'Fill Opacity',
            value: this.state.fillOpacity,          
            onChange: e => this.onChangeValue('fillOpacity', e.target.value)
          })}
          <h4 className="shapescontrols__inputContainerHeader">Scale</h4>
          {generateForm({
            fieldname: 'scale',
            fielddisplay: 'Scale',
            value: this.state.scale,          
            onChange: e => this.onChangeValue('scale', e.target.value)
          })}
          {generateForm({
            fieldname: 'scaleX',
            fielddisplay: 'Scale X',
            value: this.state.scaleX,          
            onChange: e => this.onChangeValue('scaleX', e.target.value)
          })}
          {generateForm({
            fieldname: 'scaleY',
            fielddisplay: 'Scale Y',
            value: this.state.scaleY,          
            onChange: e => this.onChangeValue('scaleY', e.target.value)
          })}
        </div>
      </div>
    );
  }
}

const generateForm = ({ fieldname, fielddisplay, onChange, value }) => (
  <fieldset className="shapescontrols__fieldset">
    <label htmlFor={fieldname}>{fielddisplay}</label>
    <input name={fieldname} onChange={onChange} value={value} />
  </fieldset>
);