export interface Layer {
  [digit: number]: number;
}

export function parseLayers(
  pixels: number[],
  width: number,
  height: number
): Layer[] {
  let layers = [];
  let currentLayer = {};
  let layerSize = width * height;
  let layerIndex = 0;
  for (let pixel of pixels) {
    if (!currentLayer[pixel]) {
      currentLayer[pixel] = [];
    }

    currentLayer[pixel]++;

    if (layerIndex === layerSize - 1) {
      layerIndex = 0;
      layers.push(currentLayer);
      currentLayer = {};
    } else {
      layerIndex++;
    }
  }
  return layers;
}
