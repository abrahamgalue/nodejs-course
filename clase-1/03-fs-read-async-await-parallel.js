// ASINCRONO PARALELO

const { readFile } = require('node:fs/promises')

// Lee los dos archivos en paralelo
// cuando termine de leer los dos archivos
// devuelve el resultado

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('primer texto:', text)
  console.log('segundo texto:', secondText)
})
