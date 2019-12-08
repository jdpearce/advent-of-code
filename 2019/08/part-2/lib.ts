export enum PixelColour {
  Black = 0,
  White = 1,
  Transparent = 2
}

export function pixelsToLayers(
  pixels: number[],
  width: number,
  height: number
): number[][] {
  let layers: number[][] = [];
  let currentLayer = [];
  let layerSize = width * height;
  let layerIndex = 0;
  for (let pixel of pixels) {
    currentLayer.push(pixel);

    if (layerIndex === layerSize - 1) {
      layerIndex = 0;
      layers.push(currentLayer);
      currentLayer = [];
    } else {
      layerIndex++;
    }
  }
  return layers;
}

export function mergeLayers(layers: number[][]): number[] {
  const output = layers[0];
  for (let i = 1; i < layers.length; i++) {
    for (let j = 0; j < layers[i].length; j++) {
      if (output[j] === PixelColour.Black || output[j] === PixelColour.White) {
        continue;
      }

      if (output[j] === PixelColour.Transparent) {
        output[j] = layers[i][j];
      }
    }
  }
  return output;
}

export function layerToLines(layer: number[], width: number): number[][] {
  const lines: number[][] = [];
  let line: number[] = [];
  for (let i = 0; i < layer.length; i++) {
    line.push(layer[i]);
    if (line.length === width) {
      lines.push(line);
      line = [];
    }
  }
  return lines;
}
