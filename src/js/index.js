import bufferService from './bufferService';
import grainService from './grainService';
import visualizeService from './visualizeService';

async function main() {
  const context = new AudioContext();
  const elements = visualizeService.getElements();
  let buffer;
  let latestGrain;

  const clearLatestGrain = () => {
    if (latestGrain) {
      clearTimeout(latestGrain.timeout);
    }
  };

  const stop = () => {
    context.suspend();
    clearLatestGrain();
  };

  const play = (grainParams) => {
    if (buffer) {
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
    }
  };

  elements.audio.addEventListener('change', async () => {
    stop();
    const [file] = elements.audio.files;
    const arrayBuffer = await file.arrayBuffer();
    buffer = await context.decodeAudioData(arrayBuffer);
    visualizeService.draw(
      elements.canvas,
      bufferService.reduceSamples(buffer.getChannelData(0)),
    );
  });

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
    stop();
  };
}

window.onload = main;
