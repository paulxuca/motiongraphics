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

export const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
		let context = this;
    let args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const getShapeValues = ({ shape }) => {
	const { _props: {
		x, y, stroke, strokeOpacity, fill, fillOpacity, scale, scaleX, scaleY
	} } = shape;
	return {
		x,
		y,

		stroke,
		strokeOpacity,

		fill,
		fillOpacity,

		scale,
		scaleX: scaleX || scale,
		scaleY: scaleY || scale,
	};
};

export const getCurrentShape = (shapes, id) => {
	return shapes.find(e => e.id === id);
};
