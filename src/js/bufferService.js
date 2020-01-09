const SAMPLES = 10000;

/**
 * @param {Float32Array} samples
 */
const reduceSamples = function reduceSamples(samples) {
  const blockSize = Math.floor(samples.length / SAMPLES);
  const filtered = [];
  for (let i = 0; i < SAMPLES; i += 1) {
    filtered.push(samples[i * blockSize]);
  }
  return filtered;
};

export default {
  reduceSamples,
};
