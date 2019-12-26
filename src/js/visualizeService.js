const WIDTH = 1000;
const HEIGHT = 250;
const ATTACK_ID = 'attack';
const RELEASE_ID = 'release';
const DURATION_ID = 'duration';
const PLAYBACK_RATE_ID = 'playbackRate';
const SPREAD_ID = 'spread';
const INTERVAL_ID = 'interval';
const WAVEFORM_CANVAS_ID = 'waveform';
const PARAM_INPUTS_ID = 'paramInputs';
const STOP_ID = 'stop';

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
 * @param {Canvas} domRect
 * @param {Number} clientPosition
 * @param {Number} bufferDuration
 * @returns {Number}
 */
const getOffset = function getOffset(canvas, clientPosition, bufferDuration) {
  const domRect = canvas.getBoundingClientRect();
  if (clientPosition) {
    const x = clientPosition.x - domRect.left;
    return x * (bufferDuration / domRect.width);
  }
  return 0;
};

/**
 * @param {AudioBuffer} buffer
 * @param {Object} elements
 * @param {Options} options
 * @returns {Object}
 */
const getGrainParams = function getGrainParams(buffer, elements, options = {}) {
  return {
    attack: Number.parseFloat(elements.attack.value),
    release: Number.parseFloat(elements.release.value),
    duration: Number.parseFloat(elements.duration.value),
    playbackRate: Number.parseFloat(elements.playbackRate.value),
    spread: Number.parseFloat(elements.spread.value),
    interval: Number.parseFloat(elements.interval.value),
    offset: getOffset(elements.canvas, options.clientPosition, buffer.duration),
  };
};

const getElements = function getElements() {
  const canvas = document.getElementById(WAVEFORM_CANVAS_ID);
  const attack = document.getElementById(ATTACK_ID);
  const release = document.getElementById(RELEASE_ID);
  const duration = document.getElementById(DURATION_ID);
  const playbackRate = document.getElementById(PLAYBACK_RATE_ID);
  const spread = document.getElementById(SPREAD_ID);
  const interval = document.getElementById(INTERVAL_ID);
  const stop = document.getElementById(STOP_ID);
  return {
    canvas,
    attack,
    release,
    duration,
    playbackRate,
    spread,
    interval,
    stop,
  };
};

const getParamInputs = function getParamInputs() {
  return document.getElementById(PARAM_INPUTS_ID);
};

export default {
  draw,
  getGrainParams,
  getElements,
  getParamInputs,
};
