const http = require('node:http')
const fs = require('node:fs')
const path = require('path')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/imagen-super-bonita.jpg') {
    fs.readFile(path.join(__dirname, 'golden-retriever-puppy.jpg'), (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Internal Server Error')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Contacto')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
