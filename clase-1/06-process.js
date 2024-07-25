// argumentos de entrada
// console.log(process.argv)

// podemos controlar el proceso y su salida

/*
todo ha ido bien

process.exit(0)

ha habido un error

process.exit(1)
*/

/*
podemos controlar eventos del proceso
process.on('exit', () => {
  limpiar los recursos
})
*/

// current working directory
// console.log(process.cwd())

// variables de entorno
console.log(process.env.PEPITO)
