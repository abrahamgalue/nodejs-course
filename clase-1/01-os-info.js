const os = require('node:os')

console.log('Informacion del SO')
console.log('------------------')

console.log('Nombre del SO:', os.platform())
console.log('Version del SO:', os.release())
console.log('Arquitectura del SO:', os.arch())
console.log('CPUs:', os.cpus()) // <------ vamos a poder escalar procesos en Node
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('uptime', os.uptime() / 60 / 60)
