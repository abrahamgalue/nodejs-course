// EN EL FUTURO: el import del json va a ser asi:
// import movies from './movies.json' with { type: 'json' }

// Como leer un json en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = path => require(path)
