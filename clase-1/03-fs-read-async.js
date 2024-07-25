// ASINCRONO CON CALLBACKS

const fs = require('node:fs')

// readFile es asíncrono y nos permite
// no detener la ejecucion del resto del código
// cuando leemos un archivo

console.log('Leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8', (err, text) => { // <--- ejecutas este callback
  if (err) {
    console.error('Se ha encontrado un error al leer el archivo')
  }
  console.log('primer texto:', text)
})

console.log('Hacer cosas mientra lee el archivo...')

console.log('Leyendo el segundo archivo...')

fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Se ha encontrado un error al leer el archivo')
  }
  console.log('segundo texto:', text)
})
