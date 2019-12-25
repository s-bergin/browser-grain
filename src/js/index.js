import fileLoader from './fileLoader';

const AUDIO_FILE = 'http://localhost:3000/audio/example1.mp3';

async function main() {
  const audioContext = new AudioContext();
  const buffer = await fileLoader.getFileAsBuffer(AUDIO_FILE);
}

window.onload = main;
