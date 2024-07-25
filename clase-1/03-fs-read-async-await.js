// ASINCRONO SECUENCIAL

const { readFile } = require('node:fs/promises')

; (async () => {
  console.log('Leyendo el primer archivo...')
  const text = await readFile('./archivo.txt', 'utf-8')
  console.log('primer texto:', text)

  console.log('Hacer cosas mientra lee el archivo...')

  console.log('Leyendo el segundo archivo...')

  const secondText = await readFile('./archivo2.txt', 'utf-8')
  console.log('segundo texto:', secondText)
})()
