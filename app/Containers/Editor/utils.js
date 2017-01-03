export const getShapeID = (e) => {
  let currTarget = e.target;
  do {
    currTarget = currTarget.parentElement;
  } while(!currTarget.classList.length);
  return currTarget.classList[0];
};

export const getExistingShapes = (shapes, type) => {
  return shapes.filter(e => e.type === type).length + 1;
};
