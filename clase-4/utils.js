// EN EL FUTURO: el import del json va a ser asi:
// import movies from './movies.json' with { type: 'json' }

// Como leer un json en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// Cargar el módulo 'fs' para leer archivos del sistema
const fs = require('fs')

// Función para leer y parsear un archivo JSON
const readJSON = path => {
  return JSON.parse(fs.readFileSync(path, 'utf-8'))
}

// Exportar la función
module.exports = {
  readJSON
}
