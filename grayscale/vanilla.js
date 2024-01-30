// JavaScript (sem WebAssembly)
function grayscaleImage_JS(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  return imageData;
}

// Função para carregar e processar a imagem
function processImage_JS() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const startTimeJS = performance.now();
    const processedImageData = grayscaleImage_JS(imageData);
    const endTimeJS = performance.now();
    console.log("Time taken (JavaScript):", endTimeJS - startTimeJS, "milliseconds");
    ctx.putImageData(processedImageData, 0, 0);
    document.body.appendChild(canvas);
  };
  img.src = 'example.png'; // Substitua 'example.png' pelo caminho da sua imagem
}

processImage_JS();
