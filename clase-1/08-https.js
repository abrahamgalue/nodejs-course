const http = require('node:http')
const { findAvalaiblePort } = require('./09-free-port.js')

const desiredPort = process.env.PORT ?? 1000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola Mundo')
})

// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })

findAvalaiblePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
