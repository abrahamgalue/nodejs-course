const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'
const [titleType, titleMT, titleLength, titleName] = ['Mode', 'LastWriteTime', 'Length', 'Name']
const titleSub = ['-'.repeat(titleType.length), '-'.repeat(titleMT.length), '-'.repeat(titleLength.length), '-'.repeat(titleName.length)]

async function ls (folder) {
  let files

  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`❌ No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // <---- stat: informacion del archivo
    } catch {
      console.error(pc.red(`❌ No se pudo leer el archivo ${filePath}`))
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd----' : '-a---'
    const fileLength = stats.size.toLocaleString()
    const fileLastModified = stats.mtime
    const fileDate = fileLastModified.toLocaleDateString()
    const fileHours = fileLastModified.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })

    return `${pc.white(fileType.padEnd(12))} ${pc.yellow(fileDate.padStart(10))} ${pc.yellow(fileHours.padStart(9))} ${pc.cyan(fileLength.padStart(14))} ${pc.blue(file.padStart(file.length + 3))}`
  })

  const filesInfo = await Promise.all(filesPromises)

  console.log(pc.green(`${titleType.padEnd(14)} ${titleMT.padStart(18)} ${pc.italic(titleLength.padStart(14))} ${titleName.padStart(7)}`))
  console.log(pc.green(`${titleSub[0].padEnd(14)} ${titleSub[1].padStart(18)} ${titleSub[2].padStart(14)} ${titleSub[3].padStart(7)}`))

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
