import bufferService from './bufferService';
import visualizeService from './visualizeService';

const AUDIO_FILE = 'http://localhost:3000/audio/example1.mp3';
const WAVEFORM_CANVAS_ID = 'waveform';

async function main() {
  const context = new AudioContext();
  const arrayBuffer = await bufferService.getFileAsArrayBuffer(AUDIO_FILE);
  const buffer = await context.decodeAudioData(arrayBuffer);

  const canvas = document.getElementById(WAVEFORM_CANVAS_ID);
  visualizeService.draw(canvas);
  canvas.addEventListener('mousedown', (event) => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    const rect = canvas.getBoundingClientRect();
    const position = visualizeService.getGrainPosition(rect, event.clientX, buffer.duration);
    source.start(context.currentTime, position, 1);
  });
}

window.onload = main;
