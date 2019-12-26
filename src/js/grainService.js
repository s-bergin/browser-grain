const SECONDS_TO_MS_WEIGHT = 1000;

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
function playGrain(context, buffer, params = {}) {
  const now = context.currentTime;
  const source = context.createBufferSource();
  source.playbackRate.value = params.playbackRate;
  source.buffer = buffer;

  const gain = context.createGain();
  source.connect(gain);
  gain.connect(context.destination);

  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(1, now + params.attack);
  gain.gain.linearRampToValueAtTime(0, now + params.attack + params.release);

  const spread = params.spread ? Math.random() * params.spread : 0;
  source.start(now, params.offset + spread, params.duration);

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
}

export default {
  playGrain,
};
