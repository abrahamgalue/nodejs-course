const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use(express.json())

// app.use((req, res, next) => {
//   console.log('mi primer middleware')
//   // trackear la request a la base de datos
//   // revisar si el usuario tiene cookies

//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''

//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)

//     data.timestapm = Date.now()
//     // mutar la request y meter la informacion en el req.body
//     req.body = data
//     // la req es unica para cada peticion
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.get('/', (req, res) => {
  res.send('<h1>MI primer hello world</h1>')
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en la bdd
  res.status(201).json(req.body)
})

// La ultima a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404<h1/>')
})

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
