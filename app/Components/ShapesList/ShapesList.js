import React from 'react';

export default ({ shapes, selectShape }) => (
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