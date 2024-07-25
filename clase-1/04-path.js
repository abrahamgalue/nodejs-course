const path = require('node:path')

/*
 Unir rutas con path.join
  Ya que en cada SO se utiliza un separador diferente
  --> Unix: /
  --> Windows: \
*/

// Barra separadora de carpetas segun cada SO
console.log(path.sep)

// Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'file.txt')

console.log(filePath)

// Obtener el nombre de un fichero en una ruta
const base = path.basename('/tmp/abraham-secret-filet/password.txt')

console.log(base)

// Obtener el nombre del fichero sin la extension
const filename = path.basename('/tmp/abraham-secret-filet/password.txt', '.txt')

console.log(filename)

// Obtener la extension de un fichero en una ruta
const extension = path.extname('/topo/my.supe.image.png')

console.log(extension)
