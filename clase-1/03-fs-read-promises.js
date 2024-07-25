// ASISCRONO PROMESAS

const fs = require('node:fs/promises')

/*
Esto solo en los módulos nativos que no tienen
promesas nativas

Para convertir en promesas métodos que no esten
nativo en Node

const fs = require('node:fs')
const { promisify } = require('node:util')

const readfilePromise = promisify(fs.readFile)
*/

console.log('Leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8')
  .then(text => console.log('primer texto:', text))

console.log('Hacer cosas mientra lee el archivo...')

console.log('Leyendo el segundo archivo...')

fs.readFile('./archivo2.txt', 'utf-8').then(text => {
  console.log('segundo texto:', text)
})
