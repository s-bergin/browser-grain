import bufferService from './bufferService';
import grainService from './grainService';
import visualizeService from './visualizeService';

const AUDIO_FILE = 'http://localhost:3000/audio/example1.mp3';

async function main() {
  const context = new AudioContext();
  const arrayBuffer = await bufferService.getFileAsArrayBuffer(AUDIO_FILE);
  const buffer = await context.decodeAudioData(arrayBuffer);

  const elements = visualizeService.getElements();
  visualizeService.draw(elements.canvas);

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

  elements.canvas.addEventListener('mousedown', (event) => {
    const clientPosition = { x: event.clientX, y: event.clientY };
    play(visualizeService.getGrainParams(buffer, elements, { clientPosition }));
  });

  const paramInputs = visualizeService.getParamInputs();
  paramInputs.addEventListener('change', () => {
    const grainParams = visualizeService.getGrainParams(buffer, elements);
    if (grains.length) {
      grainParams.offset = grains[grains.length - 1].grain.offset;
    }
    play(grainParams);
  });
}

window.onload = main;
