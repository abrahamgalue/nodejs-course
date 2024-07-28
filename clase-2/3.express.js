const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  res.send('<h1>MI primer hello world</h1>')
})

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
