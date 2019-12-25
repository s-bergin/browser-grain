/**
 * @param {String} file
 * @returns {Array<Buffer>}
 */
const getFileAsBuffer = async function getFileAsBuffer(file) {
  const response = await fetch(file);
  if (!response.ok) {
    throw new Error(`Failed to fetch file ${file}`);
  }
  return response.arrayBuffer();
};

export default {
  getFileAsBuffer,
};
