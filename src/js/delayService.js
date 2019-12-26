/**
 * Create a delay on provided source
 * @param {AudioContext} context
 * @param {AudioBufferSourceNode} source
 * @param {Object} params
 */
const createDelay = function createDelay(context, source, params = {}) {
  const delay = context.createDelay();
  delay.delayTime.value = params.time;

  const feedback = context.createGain();
  feedback.gain.value = params.feedback;

  delay.connect(feedback);
  feedback.connect(delay);

  source.connect(delay);
  delay.connect(context.destination);
};

export default {
  createDelay,
};
