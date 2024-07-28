const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.get('/', (req, res) => {
  res.send('<h1>MI primer hello world</h1>')
})

app.post('/pokemon', (req, res) => {
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)

    data.timestapm = Date.now()
    res.status(201).json(data)
  })
})

// La ul9tima a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404<h1/>')
})

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
