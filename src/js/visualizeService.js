const WIDTH = 1000;
const HEIGHT = 250;

const draw = function draw(canvas) {
  const context = canvas.getContext('2d');

  context.fillStyle = 'rgb(200, 200, 200)';
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.lineWidth = 2;
  context.strokeStyle = 'rgb(0, 0, 0)';
  context.beginPath();

  context.moveTo(0, HEIGHT / 2);
  context.lineTo(WIDTH, HEIGHT / 2);

  context.strokeStyle = 'red';
  context.stroke();

  return canvas;
};

/**
 * @param {DOMRect} domRect
 * @param {Number} clientPosition
 * @param {Number} bufferDuration
 * @returns {Number}
 */
const getGrainPosition = function getGrainPosition(domRect, clientPosition, bufferDuration) {
  const x = clientPosition - domRect.left;
  return x * (bufferDuration / domRect.width);
};

export default {
  draw,
  getGrainPosition,
};
