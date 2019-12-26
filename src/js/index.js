import bufferService from './bufferService';
import grainService from './grainService';
import visualizeService from './visualizeService';

const AUDIO_FILE = 'http://localhost:3000/audio/example1.mp3';
const WAVEFORM_CANVAS_ID = 'waveform';
const PARAM_INPUTS_ID = 'paramInputs';

async function main() {
  const context = new AudioContext();
  const arrayBuffer = await bufferService.getFileAsArrayBuffer(AUDIO_FILE);
  const buffer = await context.decodeAudioData(arrayBuffer);

  const canvas = document.getElementById(WAVEFORM_CANVAS_ID);
  visualizeService.draw(canvas);

  const grains = [];

  const play = (grainParams) => {
    grainService.playGrain(context, buffer, grainParams);
    if (grains.length === 1) {
      clearTimeout(grains[0].timeout);
      grains.shift();
    }
    const timeout = setTimeout(() => play(grainParams), grainParams.interval);
    grains.push({ grain: grainParams, timeout });
  };

  canvas.addEventListener('mousedown', (event) => {
    play(visualizeService.getGrainParams(buffer, canvas, event));
  });

  const paramInputs = document.getElementById(PARAM_INPUTS_ID);
  paramInputs.addEventListener('change', () => {
    const grainParams = visualizeService.getGrainParams(buffer, canvas);
    if (grains.length) {
      grainParams.offset = grains[grains.length - 1].grain.offset;
    }
    play(grainParams);
  });
}

window.onload = main;
