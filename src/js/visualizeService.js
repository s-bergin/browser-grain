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
const getGrainOffset = function getGrainOffset(domRect, clientPosition, bufferDuration) {
  const x = clientPosition - domRect.left;
  return x * (bufferDuration / domRect.width);
};

/**
 * @param {AudioBuffer} buffer
 * @param {Canvas} canvas
 * @param {Event} event
 * @returns {Object}
 */
const getGrainParams = function getGrainParams(buffer, canvas, event) {
  const offset = getGrainOffset(canvas.getBoundingClientRect(), event.clientX, buffer.duration);
  return {
    attack: 0.5,
    release: 0.5,
    duration: 1,
    playbackRate: 0.8,
    spread: 10,
    interval: 100,
    offset,
  };
};

export default {
  draw,
  getGrainParams,
};
