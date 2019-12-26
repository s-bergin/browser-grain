import bufferService from './bufferService';
import grainService from './grainService';
import visualizeService from './visualizeService';

const AUDIO_FILE = 'http://localhost:3000/audio/example1.mp3';
const WAVEFORM_CANVAS_ID = 'waveform';

async function main() {
  const context = new AudioContext();
  const arrayBuffer = await bufferService.getFileAsArrayBuffer(AUDIO_FILE);
  const buffer = await context.decodeAudioData(arrayBuffer);

  const canvas = document.getElementById(WAVEFORM_CANVAS_ID);
  visualizeService.draw(canvas);

  const grains = [];

  canvas.addEventListener('mousedown', (event) => {
    const grainParams = visualizeService.getGrainParams(buffer, canvas, event);

    const play = () => {
      grainService.playGrain(context, buffer, grainParams);
      if (grains.length === 1) {
        clearTimeout(grains[0].timeout);
        grains.shift();
      }
      const timeout = setTimeout(play, grainParams.interval);
      grains.push({ grain: grainParams, timeout });
    };
    play();
  });
}

window.onload = main;
