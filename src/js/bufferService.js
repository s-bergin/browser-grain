const SAMPLES = 10000;

/**
 * @param {String} file
 * @returns {ArrayBuffer}
 */
const getFileAsArrayBuffer = async function getFileAsArrayBuffer(file) {
  const response = await fetch(file);
  if (!response.ok) {
    throw new Error(`Failed to fetch file ${file}`);
  }
  return response.arrayBuffer();
};

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
  getFileAsArrayBuffer,
  reduceSamples,
};
