const WIDTH = 1000;
const HEIGHT = 250;
const ATTACK_ID = 'attack';
const RELEASE_ID = 'release';
const DURATION_ID = 'duration';
const PLAYBACK_RATE_ID = 'playbackRate';
const SPREAD_ID = 'spread';
const INTERVAL_ID = 'interval';

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
const getOffset = function getOffset(domRect, clientPosition, bufferDuration) {
  const x = clientPosition - domRect.left;
  return x * (bufferDuration / domRect.width);
};

/**
 * @param {String} elementId
 * @return {Number}
 */
const getElementValueAsFloat = function getElementValueAsFloat(elementId) {
  return parseFloat(document.getElementById(elementId).value);
};

/**
 * @param {AudioBuffer} buffer
 * @param {Canvas} canvas
 * @param {Event} event
 * @returns {Object}
 */
const getGrainParams = function getGrainParams(buffer, canvas, event) {
  return {
    attack: getElementValueAsFloat(ATTACK_ID),
    release: getElementValueAsFloat(RELEASE_ID),
    duration: getElementValueAsFloat(DURATION_ID),
    playbackRate: getElementValueAsFloat(PLAYBACK_RATE_ID),
    spread: getElementValueAsFloat(SPREAD_ID),
    interval: getElementValueAsFloat(INTERVAL_ID),
    offset: event ? getOffset(canvas.getBoundingClientRect(), event.clientX, buffer.duration) : 0,
  };
};

export default {
  draw,
  getGrainParams,
};
