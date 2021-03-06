const ATTACK_ID = 'attack';
const RELEASE_ID = 'release';
const DURATION_ID = 'duration';
const PLAYBACK_RATE_ID = 'playbackRate';
const SPREAD_ID = 'spread';
const INTERVAL_ID = 'interval';
const WAVEFORM_CANVAS_ID = 'waveform';
const PARAM_INPUTS_ID = 'paramInputs';
const STOP_ID = 'stop';
const DELAY_TIME_ID = 'delayTime';
const DELAY_FEEDBACK_ID = 'delayFeedback';
const AUDIO_ID = 'audio';

const drawWaveform = function drawWaveform(canvas, audioData) {
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#FFFFFF';
  context.translate(0, canvas.height / 2);
  audioData.forEach((data, index) => {
    const x = Math.floor((canvas.width * index) / audioData.length);
    const y = (data * canvas.height) / 2;
    context.moveTo(x, 0);
    context.lineTo(x + 1, y);
  });
  context.stroke();
};

const clearCanvas = function clearCanvas(canvas) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.beginPath();
};

const draw = function draw(canvas, audioData) {
  clearCanvas(canvas);
  drawWaveform(canvas, audioData);
};

/**
 * @param {Canvas} domRect
 * @param {Number} clientPosition
 * @param {AudioBuffer} buffer
 * @returns {Number}
 */
const getOffset = function getOffset(canvas, clientPosition, buffer) {
  if (clientPosition && buffer) {
    const domRect = canvas.getBoundingClientRect();
    const x = clientPosition.x - domRect.left;
    return x * (buffer.duration / domRect.width);
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
    offset: getOffset(elements.canvas, options.clientPosition, buffer),
    delay: {
      time: Number.parseFloat(elements.delay.time.value),
      feedback: Number.parseFloat(elements.delay.feedback.value),
    },
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
  const delayTime = document.getElementById(DELAY_TIME_ID);
  const delayFeedback = document.getElementById(DELAY_FEEDBACK_ID);
  const audio = document.getElementById(AUDIO_ID);
  return {
    canvas,
    attack,
    release,
    duration,
    playbackRate,
    spread,
    interval,
    stop,
    audio,
    delay: {
      time: delayTime,
      feedback: delayFeedback,
    },
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
