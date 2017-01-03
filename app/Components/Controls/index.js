import React from 'react';
import { SHAPES } from '../../Motion/constants';
import './styles.scss';

export default ({ isOpen, addShape }) => (
  <div
    className="controls__container"
    style={{
      transform: isOpen ? 'translateY(0px)' : 'translateY(-100px)',
    }}
  >
    <ul className="controls__shapeslist">
    {Object.keys(SHAPES).map(e => {
      return (
        <li
          key={e}
          onClick={() =>
            addShape(SHAPES[e].shape, SHAPES[e].name)
          }
        >
          {SHAPES[e].shape}
        </li>
      );
    })}
    </ul>
  </div>
);