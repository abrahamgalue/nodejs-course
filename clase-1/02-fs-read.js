// SINCRONO

const fs = require('node:fs')

// readFileSync es síncrono y detiene la ejecucion
// hasta que se resuelva la peticion

console.log('Leyendo el primer archivo...')
const text = fs.readFileSync('./archivo.txt', { encoding: 'utf-8' })

console.log(text)

console.log('Hacer cosas mientra lee el archivo...')

console.log('Leyendo el segundo archivo...')
const secondText = fs.readFileSync('./archivo2.txt', { encoding: 'utf-8' })

console.log(secondText)
