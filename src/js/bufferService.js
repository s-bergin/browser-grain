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

export default {
  getFileAsArrayBuffer,
};
