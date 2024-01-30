// JavaScript com WebAssembly
const Module = require('./grayscale.js'); // Importa o módulo WebAssembly

const grayscaleImage_WASM = Module.cwrap('grayscaleImage_WASM', null, ['number', 'number']); // Obtém a função C/C++ exportada

function grayscaleImage_WASM_JS(imageData) {
  const data = imageData.data;
  const buffer = Module._malloc(data.length);
  Module.HEAPU8.set(data, buffer);
  grayscaleImage_WASM(buffer, data.length);
  imageData.data.set(Module.HEAPU8.subarray(buffer, buffer + data.length));
  Module._free(buffer);
  return imageData;
}

// Função para carregar e processar a imagem
function processImage_WASM() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const startTimeWASM = performance.now();
    const processedImageData = grayscaleImage_WASM_JS(imageData);
    const endTimeWASM = performance.now();
    console.log("Time taken (WebAssembly):", endTimeWASM - startTimeWASM, "milliseconds");
    ctx.putImageData(processedImageData, 0, 0);
    document.body.appendChild(canvas);
  };
  img.src = 'example.png'; // Substitua 'example.png' pelo caminho da sua imagem
}

processImage_WASM();
