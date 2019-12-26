import delayService from './delayService';

const SECONDS_TO_MS_WEIGHT = 1000;

const createSource = function createSource(context, buffer, params) {
  const source = context.createBufferSource();
  source.playbackRate.value = params.playbackRate;
  source.buffer = buffer;
  return source;
};

const getOffset = function getOffset(offset, spread) {
  const randomSpread = spread ? Math.random() * spread : 0;
  return offset + randomSpread;
};

/**
 * Create a grain by sending the provided
 * params to the audio context destination
 *
 * A garbage collection is ran to kill the gain and
 * source objects.
 * @param {AudioContext} context
 * @param {AudioBuffer} buffer
 * @param {Object} params
 */
const playGrain = function playGrain(context, buffer, params = {}) {
  const now = context.currentTime;
  const source = createSource(context, buffer, params);

  const gain = context.createGain();
  source.connect(gain);
  gain.connect(context.destination);

  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(1, now + params.attack);
  gain.gain.linearRampToValueAtTime(0, now + params.attack + params.release);

  source.start(now, getOffset(params.offset, params.spread), params.duration);

  const garbageCollectTimeout = (
    params.duration
    + params.attack
    + params.release)
    * SECONDS_TO_MS_WEIGHT
    + params.interval;
  setTimeout(() => {
    source.stop();
    gain.disconnect();
  }, garbageCollectTimeout);
};

const createGrainDelay = function createGrainDelay(context, buffer, params) {
  if (params.delay.time) {
    const source = createSource(context, buffer, params);
    const now = context.currentTime;
    source.start(now, getOffset(params.offset, params.spread), params.duration);
    delayService.createDelay(context, source, params.delay);
  }
};

export default {
  playGrain,
  createGrainDelay,
};
