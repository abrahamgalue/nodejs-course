const express = require('express')
const { json } = require('express')
const { moviesRouter } = require('../routes/movies.js')
const { corsMiddleware } = require('../middlewares/cors')

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.get('/', (req, res) => {
  res.json({
    message:
      'Hello!! This is a REST API for movies you can go to the relative address /movies to get a list of all of them!',
  })
})
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 7777

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

module.exports = app
