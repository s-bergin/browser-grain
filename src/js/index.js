import bufferService from './bufferService';
import grainService from './grainService';
import visualizeService from './visualizeService';

const AUDIO_FILE = 'http://localhost:3000/audio/example1.mp3';

async function main() {
  const context = new AudioContext();
  const arrayBuffer = await bufferService.getFileAsArrayBuffer(AUDIO_FILE);
  const buffer = await context.decodeAudioData(arrayBuffer);

  const elements = visualizeService.getElements();
  visualizeService.draw(
    elements.canvas,
    bufferService.reduceSamples(buffer.getChannelData(0)),
  );

  let latestGrain;

  const clearLatestGrain = () => {
    if (latestGrain) {
      clearTimeout(latestGrain.timeout);
    }
  };

  const play = (grainParams) => {
    const loop = () => {
      clearLatestGrain();
      grainService.playGrain(context, buffer, grainParams);
      const timeout = setTimeout(() => loop(grainParams), grainParams.interval);
      latestGrain = { grain: grainParams, timeout };
    };
    if (context.state === 'suspended') {
      context.resume();
    }
    loop();
    grainService.createGrainDelay(context, buffer, grainParams);
  };

  elements.canvas.addEventListener('mousedown', (event) => {
    const clientPosition = { x: event.clientX, y: event.clientY };
    play(visualizeService.getGrainParams(buffer, elements, { clientPosition }));
  });

  const paramInputs = visualizeService.getParamInputs();
  paramInputs.addEventListener('change', () => {
    const grainParams = visualizeService.getGrainParams(buffer, elements);
    if (latestGrain) {
      grainParams.offset = latestGrain.grain.offset;
    }
    play(grainParams);
  });

  elements.stop.onclick = () => {
    context.suspend();
    clearLatestGrain();
  };
}

window.onload = main;
